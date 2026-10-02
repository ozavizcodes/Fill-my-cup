export const experienceCategories = [
  'reading', 'food', 'staycation', 'travel', 'fashion', 'creativity', 'career', 'wellness', 'relationships', 'fun',
] as const

export type ExperienceCategory = (typeof experienceCategories)[number]
export type ExperienceStatus = 'planned' | 'completed'

export type Experience = {
  id: string
  title: string
  category: ExperienceCategory
  description?: string
  date?: string
  status: ExperienceStatus
  completedAt?: string
  notes?: string
  createdAt: string
}

export const experienceCategoryMeta: Record<ExperienceCategory, { emoji: string; label: string }> = {
  reading: { emoji: '📚', label: 'Reading' }, food: { emoji: '🍝', label: 'Food & Recipes' }, staycation: { emoji: '🏨', label: 'Rest & Staycations' }, travel: { emoji: '🌍', label: 'Travel & Adventure' }, fashion: { emoji: '👗', label: 'Fashion & Beauty' }, creativity: { emoji: '🎨', label: 'Creativity' }, career: { emoji: '💻', label: 'Career & Tech' }, wellness: { emoji: '🏋🏽‍♀️', label: 'Wellness' }, relationships: { emoji: '🫶🏽', label: 'Relationships & Social' }, fun: { emoji: '🎉', label: 'Fun / Just-for-Fun' },
}
