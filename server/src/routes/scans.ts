import { Router, Response } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs/promises'
import { v4 as uuid } from 'uuid'
import { prisma } from '../db/client.js'
import { requireAuth, optionalAuth, AuthRequest } from '../middleware/auth.js'
import { analyzeDocument, generateSummary } from '../services/analysis.js'
import { extractTextFromPDF } from '../services/extraction.js'
import { generateDisputeLetter } from '../services/dispute.js'

const router = Router()

const uploadDir = path.resolve('uploads')

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `${uuid()}${ext}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (_req, file, cb) => {
    const allowed = ['.pdf', '.jpg', '.jpeg', '.png', '.heic']
    const ext = path.extname(file.originalname).toLowerCase()
    if (allowed.includes(ext)) {
      cb(null, true)
    } else {
      cb(new Error('Unsupported file type'))
    }
  },
})

// Create a new scan (upload document)
router.post('/', optionalAuth, upload.single('file'), async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    const { documentType, country, tier } = req.body
    if (!documentType || !country || !tier) {
      return res.status(400).json({ message: 'Missing required fields: documentType, country, tier' })
    }

    const scan = await prisma.scan.create({
      data: {
        userId: req.userId || null,
        documentType,
        country,
        tier,
        status: 'pending',
        filePath: req.file.path,
      },
    })

    return res.json({ scan: { id: scan.id, status: scan.status } })
  } catch (err: any) {
    return res.status(500).json({ message: err.message || 'Failed to create scan' })
  }
})

// Get user's scans
router.get('/', requireAuth, async (req: AuthRequest, res: Response) => {
  const scans = await prisma.scan.findMany({
    where: { userId: req.userId },
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { flags: true } } },
  })
  return res.json({ scans })
})

// Get a specific scan
router.get('/:id', optionalAuth, async (req: AuthRequest, res: Response) => {
  const scan = await prisma.scan.findUnique({
    where: { id: req.params.id },
    include: { flags: true },
  })

  if (!scan) {
    return res.status(404).json({ message: 'Scan not found' })
  }

  return res.json({ scan })
})

// TEST MODE: Trigger analysis without payment
router.post('/:id/analyze', optionalAuth, async (req: AuthRequest, res: Response) => {
  const scan = await prisma.scan.findUnique({ where: { id: req.params.id } })
  if (!scan) return res.status(404).json({ message: 'Scan not found' })

  // Mark as paid and trigger analysis
  await prisma.scan.update({ where: { id: scan.id }, data: { status: 'paid' } })
  runAnalysis(scan.id).catch(err => console.error('Analysis failed:', scan.id, err))
  return res.json({ message: 'Analysis started' })
})

// Run analysis (called after payment confirmed)
export async function runAnalysis(scanId: string) {
  const scan = await prisma.scan.findUnique({ where: { id: scanId } })
  if (!scan || !scan.filePath) return

  try {
    // Update status
    await prisma.scan.update({ where: { id: scanId }, data: { status: 'extracting' } })

    // Extract text
    let extractedText: string
    try {
      extractedText = await extractTextFromPDF(scan.filePath)
    } catch {
      // For non-PDF files, use a placeholder — in production this would use Textract/OCR
      extractedText = `[Image document uploaded - OCR processing required. File: ${path.basename(scan.filePath)}]`
    }

    await prisma.scan.update({
      where: { id: scanId },
      data: { extractedText, status: 'analyzing' },
    })

    // Run AI analysis + summary in parallel
    const [flags, summary] = await Promise.all([
      analyzeDocument(extractedText, scan.documentType, scan.country, scan.tier),
      generateSummary(extractedText, scan.documentType, scan.country),
    ])

    // Save flags
    for (const flag of flags) {
      await prisma.flag.create({
        data: {
          scanId,
          flag_title: flag.flag_title,
          severity: flag.severity,
          plain_english: flag.plain_english,
          estimated_impact: flag.estimated_impact || '',
          regulation_cited: flag.regulation_cited || '',
          recommended_action: flag.recommended_action || '',
        },
      })
    }

    // Generate resources if full-dispute tier
    let resources = null
    if (scan.tier === 'full-dispute') {
      const { getResources } = await import('../services/resources.js')
      resources = JSON.stringify(getResources(scan.documentType, scan.country))
    }

    // Mark complete
    await prisma.scan.update({
      where: { id: scanId },
      data: { status: 'completed', resources, summary },
    })

    // Clean up uploaded file
    try {
      await fs.unlink(scan.filePath)
    } catch {
      // File may already be deleted
    }

    // Clear extracted text for privacy
    await prisma.scan.update({
      where: { id: scanId },
      data: { extractedText: null, filePath: null },
    })
  } catch (err: any) {
    await prisma.scan.update({
      where: { id: scanId },
      data: { status: 'failed', errorMessage: err.message },
    })

    // Still clean up file on failure
    if (scan.filePath) {
      try { await fs.unlink(scan.filePath) } catch {}
    }
  }
}

// Download dispute letter
router.get('/:id/dispute-letter', optionalAuth, async (req: AuthRequest, res: Response) => {
  const scan = await prisma.scan.findUnique({
    where: { id: req.params.id },
    include: { flags: true },
  })

  if (!scan) {
    return res.status(404).json({ message: 'Scan not found' })
  }
  if (scan.tier !== 'full-dispute') {
    return res.status(403).json({ message: 'Dispute letter requires Full Report + Dispute tier' })
  }

  const letter = generateDisputeLetter(scan, scan.flags)

  res.setHeader('Content-Type', 'text/plain')
  res.setHeader('Content-Disposition', `attachment; filename="dispute-letter-${scan.id}.txt"`)
  return res.send(letter)
})

export default router
