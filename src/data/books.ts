import type { Book } from '../types/book'

const createdAt = '2026-09-28T08:00:00.000Z'

export const seedBooks: Book[] = [
  { id: 'mountain-is-you', title: 'The Mountain Is You', author: 'Brianna Wiest', status: 'reading', progress: 0, startedAt: createdAt, createdAt, notes: [] },
  { id: 'creative-act', title: 'The Creative Act: A Way of Being', author: 'Rick Rubin', status: 'planned', progress: 0, createdAt, notes: [] },
  { id: 'americanah-book', title: 'Americanah', author: 'Chimamanda Ngozi Adichie', status: 'planned', progress: 0, createdAt, notes: [] },
  { id: 'pride-prejudice-book', title: 'Pride and Prejudice', author: 'Jane Austen', status: 'planned', progress: 0, createdAt, notes: [] },
]
