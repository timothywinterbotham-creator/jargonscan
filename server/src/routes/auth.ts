import { Router, Response } from 'express'
import bcrypt from 'bcryptjs'
import { prisma } from '../db/client.js'
import { generateToken, requireAuth, AuthRequest } from '../middleware/auth.js'
import { z } from 'zod'

const router = Router()

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  country: z.string().length(2),
  inviteCode: z.string().min(1, 'Invite code is required'),
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: '/',
}

router.post('/signup', async (req: AuthRequest, res: Response) => {
  try {
    const { email, password, country, inviteCode } = signupSchema.parse(req.body)

    // Validate invite code
    const invite = await prisma.inviteCode.findUnique({ where: { code: inviteCode } })
    if (!invite) {
      return res.status(400).json({ message: 'Invalid invite code' })
    }
    if (invite.usedBy) {
      return res.status(400).json({ message: 'This invite code has already been used' })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' })
    }

    const passwordHash = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
      data: { email, passwordHash, country },
    })

    // Mark invite code as used
    await prisma.inviteCode.update({
      where: { code: inviteCode },
      data: { usedBy: user.id, usedAt: new Date() },
    })

    // Create initial credits
    await prisma.credit.create({
      data: { userId: user.id, balance: 0 },
    })

    const token = generateToken(user.id)
    res.cookie('token', token, COOKIE_OPTIONS)

    return res.json({
      token,
      user: { id: user.id, email: user.email, country: user.country, createdAt: user.createdAt },
    })
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ message: err.errors[0].message })
    }
    return res.status(500).json({ message: 'Server error' })
  }
})

router.post('/login', async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body)

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const token = generateToken(user.id)
    res.cookie('token', token, COOKIE_OPTIONS)

    return res.json({
      token,
      user: { id: user.id, email: user.email, country: user.country, createdAt: user.createdAt },
    })
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ message: err.errors[0].message })
    }
    return res.status(500).json({ message: 'Server error' })
  }
})

router.post('/logout', (_req: AuthRequest, res: Response) => {
  res.clearCookie('token', { path: '/' })
  return res.json({ message: 'Logged out' })
})

router.get('/me', requireAuth, async (req: AuthRequest, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: { id: true, email: true, country: true, createdAt: true },
  })
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }
  return res.json({ user })
})

export default router
