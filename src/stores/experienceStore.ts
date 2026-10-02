import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { seedExperiences } from '../data/experiences'
import type { Experience } from '../types/experience'
import { deferredLocalStorage } from '../utils/persistence'

type ExperienceDraft = Pick<Experience, 'title' | 'category' | 'description' | 'date' | 'notes'>
type ExperienceStore = {
  experiences: Experience[]
  addExperience: (experience: ExperienceDraft) => void
  updateExperience: (id: string, experience: ExperienceDraft) => void
  deleteExperience: (id: string) => void
  completeExperience: (id: string) => void
  reopenExperience: (id: string) => void
}

export const useExperienceStore = create<ExperienceStore>()(persist((set) => ({
  experiences: seedExperiences,
  addExperience: (draft) => set((state) => ({ experiences: [...state.experiences, { ...draft, id: crypto.randomUUID(), status: 'planned', createdAt: new Date().toISOString() }] })),
  updateExperience: (id, draft) => set((state) => ({ experiences: state.experiences.map((experience) => experience.id === id ? { ...experience, ...draft } : experience) })),
  deleteExperience: (id) => set((state) => ({ experiences: state.experiences.filter((experience) => experience.id !== id) })),
  completeExperience: (id) => set((state) => ({ experiences: state.experiences.map((experience) => experience.id === id ? { ...experience, status: 'completed', completedAt: new Date().toISOString() } : experience) })),
  reopenExperience: (id) => set((state) => ({ experiences: state.experiences.map((experience) => experience.id === id ? { ...experience, status: 'planned', completedAt: undefined } : experience) })),
}), { name: 'fill-my-cup-experiences', storage: createJSONStorage(() => deferredLocalStorage) }))
