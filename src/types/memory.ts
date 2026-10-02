export const memoryCategories = ['Wellness', 'Food', 'Relationships', 'Rest', 'Reading', 'Everyday'] as const

export type Memory = {
  id: string
  title: string
  date: string
  description: string
  category: string
  emoji: string
  createdAt: string
  updatedAt: string
}
