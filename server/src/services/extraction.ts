import fs from 'fs/promises'
import pdf from 'pdf-parse'

export async function extractTextFromPDF(filePath: string): Promise<string> {
  const buffer = await fs.readFile(filePath)

  // Try pdf-parse first (works with most standard PDFs)
  try {
    const data = await pdf(buffer)
    if (data.text && data.text.trim().length > 50) {
      console.log(`[extraction] pdf-parse succeeded: ${data.text.length} chars`)
      return data.text
    }
    console.log(`[extraction] pdf-parse returned insufficient text (${data.text?.length || 0} chars), trying fallback...`)
  } catch (err: any) {
    console.log(`[extraction] pdf-parse failed: ${err.message}, trying fallback...`)
  }

  // Fallback: use pdfjs-dist (handles more PDF variants)
  try {
    const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs')
    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(buffer),
      verbosity: 0, // suppress font warnings
    })
    const doc = await loadingTask.promise
    const textParts: string[] = []

    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i)
      const content = await page.getTextContent()
      const pageText = content.items
        .map((item: any) => item.str)
        .join(' ')
      textParts.push(pageText)
    }

    const fullText = textParts.join('\n\n')
    console.log(`[extraction] pdfjs-dist fallback succeeded: ${fullText.length} chars`)

    if (fullText.trim().length < 20) {
      throw new Error('Extracted text too short — document may be image-based')
    }

    return fullText
  } catch (err: any) {
    console.error(`[extraction] Both extractors failed: ${err.message}`)
    throw new Error(`Could not extract text from PDF: ${err.message}`)
  }
}
