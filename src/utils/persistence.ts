import type { StateStorage } from 'zustand/middleware'

const pendingWrites = new Map<string, string>()
let flushScheduled = false

function flushWrites() {
  flushScheduled = false
  for (const [key, value] of pendingWrites) localStorage.setItem(key, value)
  pendingWrites.clear()
}

/** Keeps state updates responsive by moving localStorage writes out of the current interaction. */
export const deferredLocalStorage: StateStorage = {
  getItem: (name) => localStorage.getItem(name),
  setItem: (name, value) => {
    pendingWrites.set(name, value)
    if (!flushScheduled) {
      flushScheduled = true
      window.setTimeout(flushWrites, 0)
    }
  },
  removeItem: (name) => {
    pendingWrites.delete(name)
    localStorage.removeItem(name)
  },
}
