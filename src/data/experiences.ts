import type { Experience } from '../types/experience'

const createdAt = '2026-09-28T08:00:00.000Z'

export const seedExperiences: Experience[] = [
  { id: 'read-mountain-is-you', title: 'Read The Mountain Is You', category: 'reading', description: 'A quiet autumn read.', date: '2026-10-04', status: 'completed', completedAt: '2026-10-04T19:00:00.000Z', createdAt },
  { id: 'beach-day', title: 'Have a beach day', category: 'travel', description: 'Pack fruit, a good book, and stay through sunset.', date: '2026-10-10', status: 'planned', createdAt },
  { id: 'new-recipe', title: 'Try a new recipe', category: 'food', description: 'Make lemon herb pasta from scratch.', date: '2026-10-16', status: 'completed', completedAt: '2026-10-16T20:00:00.000Z', createdAt },
  { id: 'spa-day', title: 'Have a spa day', category: 'wellness', description: 'An unhurried Sunday reset.', date: '2026-10-25', status: 'completed', completedAt: '2026-10-25T16:00:00.000Z', createdAt },
  { id: 'creative-act', title: 'Read The Creative Act', category: 'reading', date: '2026-11-02', status: 'planned', createdAt },
  { id: 'solo-date', title: 'Have a solo date', category: 'fun', description: 'Dress up, take myself somewhere lovely.', date: '2026-11-07', status: 'planned', createdAt },
  { id: 'wardrobe-reset', title: 'Do a wardrobe reset', category: 'fashion', date: '2026-11-14', status: 'planned', createdAt },
  { id: 'pottery-class', title: 'Try a pottery class', category: 'creativity', description: 'Make something imperfect with my hands.', date: '2026-11-21', status: 'planned', createdAt },
  { id: 'americanah', title: 'Read Americanah', category: 'reading', date: '2026-11-28', status: 'planned', createdAt },
  { id: 'girls-day', title: 'Have a girls’ day', category: 'relationships', date: '2026-12-05', status: 'planned', createdAt },
  { id: 'staycation', title: 'Have a staycation', category: 'staycation', description: 'A night away with no agenda.', date: '2026-12-12', status: 'planned', createdAt },
  { id: 'dinner', title: 'Host a dinner', category: 'relationships', date: '2026-12-18', status: 'planned', createdAt },
  { id: 'photoshoot', title: 'Have a personal photoshoot', category: 'fashion', date: '2026-12-22', status: 'planned', createdAt },
  { id: 'vision-board', title: 'Create a vision board', category: 'creativity', date: '2026-12-28', status: 'planned', createdAt },
  { id: 'pride-prejudice', title: 'Read Pride and Prejudice', category: 'reading', date: '2026-12-30', status: 'planned', createdAt },
]
