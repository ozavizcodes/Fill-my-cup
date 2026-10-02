import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { seedMemories } from '../data/memories'
import type { Memory } from '../types/memory'
import { deferredLocalStorage } from '../utils/persistence'

export type MemoryDraft = Pick<Memory, 'title' | 'date' | 'description' | 'category' | 'emoji'>

type MemoryStore = {
  memories: Memory[]
  addMemory: (draft: MemoryDraft) => void
  updateMemory: (id: string, draft: MemoryDraft) => void
  deleteMemory: (id: string) => void
}

export const useMemoryStore = create<MemoryStore>()(persist((set) => ({
  memories: seedMemories,
  addMemory: (draft) => set((state) => {
    const now = new Date().toISOString()
    return { memories: [...state.memories, { ...draft, id: crypto.randomUUID(), createdAt: now, updatedAt: now }] }
  }),
  updateMemory: (id, draft) => set((state) => ({ memories: state.memories.map((memory) => memory.id === id ? { ...memory, ...draft, updatedAt: new Date().toISOString() } : memory) })),
  deleteMemory: (id) => set((state) => ({ memories: state.memories.filter((memory) => memory.id !== id) })),
}), { name: 'fill-my-cup-memories', storage: createJSONStorage(() => deferredLocalStorage) }))
