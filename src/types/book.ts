export type BookStatus = 'planned' | 'reading' | 'completed'

export type BookNote = { id: string; text: string; chapter?: string; page?: string; createdAt: string }

export type Book = { id: string; title: string; author: string; status: BookStatus; progress: number; startedAt?: string; completedAt?: string; createdAt: string; notes: BookNote[] }
