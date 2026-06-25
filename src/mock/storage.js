const STORAGE_PREFIX = 'order_admin_'

export function readStorage(key, fallback) {
  const raw = window.localStorage.getItem(`${STORAGE_PREFIX}${key}`)
  if (!raw) return fallback

  try {
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function writeStorage(key, value) {
  window.localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value))
}

export function removeStorage(key) {
  window.localStorage.removeItem(`${STORAGE_PREFIX}${key}`)
}
