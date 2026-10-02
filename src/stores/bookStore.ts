import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { seedBooks } from '../data/books'
import type { Book, BookNote, BookStatus } from '../types/book'
import { syncReadingExperience } from '../utils/reading'
import { deferredLocalStorage } from '../utils/persistence'

export type BookDraft = Pick<Book, 'title' | 'author' | 'status' | 'progress'>
export type BookNoteDraft = Pick<BookNote, 'text' | 'chapter' | 'page'>
type BookStore = { books: Book[]; addBook: (draft: BookDraft) => void; updateBook: (id: string, draft: BookDraft) => void; deleteBook: (id: string) => void; startReading: (id: string) => void; updateProgress: (id: string, progress: number) => void; completeBook: (id: string) => void; reopenBook: (id: string) => void; addBookNote: (bookId: string, draft: BookNoteDraft) => void; updateBookNote: (bookId: string, noteId: string, draft: BookNoteDraft) => void; deleteBookNote: (bookId: string, noteId: string) => void }

const boundedProgress = (value: number) => Math.min(100, Math.max(0, Math.round(value)))
const startDate = (status: BookStatus) => status === 'reading' ? new Date().toISOString() : undefined

export const useBookStore = create<BookStore>()(persist((set, get) => ({
  books: seedBooks,
  addBook: (draft) => set((state) => ({ books: [...state.books, { ...draft, id: crypto.randomUUID(), progress: draft.status === 'completed' ? 100 : boundedProgress(draft.progress), startedAt: startDate(draft.status), completedAt: draft.status === 'completed' ? new Date().toISOString() : undefined, createdAt: new Date().toISOString(), notes: [] }] })),
  updateBook: (id, draft) => { const book = get().books.find((item) => item.id === id); if (!book) return; set((state) => ({ books: state.books.map((item) => item.id === id ? { ...item, ...draft, progress: draft.status === 'completed' ? 100 : boundedProgress(draft.progress), startedAt: draft.status === 'reading' ? item.startedAt ?? new Date().toISOString() : item.startedAt, completedAt: draft.status === 'completed' ? item.completedAt ?? new Date().toISOString() : undefined } : item) })); if (draft.status === 'completed') syncReadingExperience(book.title, true); else if (book.status === 'completed') syncReadingExperience(book.title, false) },
  deleteBook: (id) => set((state) => ({ books: state.books.filter((book) => book.id !== id) })),
  startReading: (id) => set((state) => ({ books: state.books.map((book) => book.id === id ? { ...book, status: 'reading', startedAt: book.startedAt ?? new Date().toISOString() } : book) })),
  updateProgress: (id, progress) => set((state) => ({ books: state.books.map((book) => book.id === id ? { ...book, progress: boundedProgress(progress) } : book) })),
  completeBook: (id) => { const book = get().books.find((item) => item.id === id); if (!book) return; set((state) => ({ books: state.books.map((item) => item.id === id ? { ...item, status: 'completed', progress: 100, completedAt: new Date().toISOString() } : item) })); syncReadingExperience(book.title, true) },
  reopenBook: (id) => { const book = get().books.find((item) => item.id === id); if (!book) return; set((state) => ({ books: state.books.map((item) => item.id === id ? { ...item, status: 'reading', completedAt: undefined } : item) })); syncReadingExperience(book.title, false) },
  addBookNote: (bookId, draft) => set((state) => ({ books: state.books.map((book) => book.id === bookId ? { ...book, notes: [...book.notes, { ...draft, id: crypto.randomUUID(), createdAt: new Date().toISOString() }] } : book) })),
  updateBookNote: (bookId, noteId, draft) => set((state) => ({ books: state.books.map((book) => book.id === bookId ? { ...book, notes: book.notes.map((note) => note.id === noteId ? { ...note, ...draft } : note) } : book) })),
  deleteBookNote: (bookId, noteId) => set((state) => ({ books: state.books.map((book) => book.id === bookId ? { ...book, notes: book.notes.filter((note) => note.id !== noteId) } : book) })),
}), { name: 'fill-my-cup-reading', storage: createJSONStorage(() => deferredLocalStorage) }))
