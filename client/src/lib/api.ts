const API_BASE = import.meta.env.PROD
  ? 'https://jargonscan-server-production.up.railway.app/api'
  : '/api'

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export function setToken(token: string) {
  localStorage.setItem('token', token)
}

export function clearToken() {
  localStorage.removeItem('token')
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
      ...options?.headers,
    },
    ...options,
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Request failed' }))
    throw new Error(error.message || `HTTP ${res.status}`)
  }

  return res.json()
}

export const api = {
  // Auth
  signup: (data: { email: string; password: string; country: string; inviteCode: string }) =>
    request('/auth/signup', { method: 'POST', body: JSON.stringify(data) }),

  login: (data: { email: string; password: string }) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify(data) }),

  logout: () =>
    request('/auth/logout', { method: 'POST' }),

  me: () =>
    request<{ user: any }>('/auth/me'),

  // Scans
  createScan: (formData: FormData) =>
    fetch(`${API_BASE}/scans`, {
      method: 'POST',
      credentials: 'include',
      headers: { ...getAuthHeader() },
      body: formData,
    }).then(async (res) => {
      if (!res.ok) throw new Error((await res.json()).message)
      return res.json()
    }),

  getScan: (id: string) =>
    request<{ scan: any }>(`/scans/${id}`),

  getScans: () =>
    request<{ scans: any[] }>('/scans'),

  // Test mode: trigger analysis without payment
  triggerAnalysis: (scanId: string) =>
    request('/scans/' + scanId + '/analyze', { method: 'POST' }),

  // Payments
  createCheckout: (data: { scanId: string; tier: string }) =>
    request<{ url: string }>('/payments/checkout', { method: 'POST', body: JSON.stringify(data) }),

  getCredits: () =>
    request<{ balance: number }>('/payments/credits'),

  // Dispute letters
  getDisputeLetter: (scanId: string) =>
    fetch(`${API_BASE}/scans/${scanId}/dispute-letter`, {
      credentials: 'include',
      headers: { ...getAuthHeader() },
    }),
}
