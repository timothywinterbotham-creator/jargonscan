import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production'

export interface AuthRequest extends Request {
  userId?: string
}

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): { userId: string } {
  return jwt.verify(token, JWT_SECRET) as { userId: string }
}

function getToken(req: AuthRequest): string | undefined {
  // Check Authorization header first, then cookies
  const authHeader = req.headers.authorization
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7)
  }
  return req.cookies?.token
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const token = getToken(req)
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' })
  }

  try {
    const { userId } = verifyToken(token)
    req.userId = userId
    next()
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}

export function optionalAuth(req: AuthRequest, _res: Response, next: NextFunction) {
  const token = getToken(req)
  if (token) {
    try {
      const { userId } = verifyToken(token)
      req.userId = userId
    } catch {
      // Not authenticated — that's OK
    }
  }
  next()
}
