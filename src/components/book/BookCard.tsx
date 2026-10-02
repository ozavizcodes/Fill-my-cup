import { motion } from 'framer-motion'
import { BookOpen, Check, Pencil, Plus, RotateCcw, Trash2 } from 'lucide-react'
import { memo } from 'react'
import type { Book } from '../../types/book'

type BookCardProps = { book: Book; featured?: boolean; onEdit: (book: Book) => void; onDelete: (book: Book) => void; onStart: (id: string) => void; onProgress: (book: Book) => void; onComplete: (id: string) => void; onReopen: (id: string) => void; onNote: (book: Book) => void }

const shownProgress = (value: number) => Number.isFinite(value) ? Math.min(100, Math.max(0, Math.round(value))) : 0

export const BookCard = memo(function BookCard({ book, featured = false, onEdit, onDelete, onStart, onProgress, onComplete, onReopen, onNote }: BookCardProps) {
  const completed = book.status === 'completed'
  const progress = shownProgress(book.progress)
  return <article className={`book-card card${featured ? ' book-card--featured' : ''}`}><div className="experience-card__top"><span className="experience-category"><BookOpen size={14} /> {book.status === 'reading' ? 'Currently reading' : completed ? 'A book completed' : 'Up next'}</span><span className={`status-badge ${completed ? 'completed' : ''}`}>{completed ? 'Completed ✓' : book.status === 'reading' ? `${progress}%` : 'Planned'}</span></div><h2>{book.title}</h2><p className="book-author">{book.author}</p>{book.status !== 'planned' && <><div className="book-progress"><motion.div initial={false} animate={{ width: `${progress}%` }} transition={{ duration: .35 }} /></div><p className="book-progress-copy">{progress}% complete</p></>}<div className="experience-card__actions">{book.status === 'planned' ? <button className="small-button small-button--primary" type="button" onClick={() => onStart(book.id)}><BookOpen size={14} /> Start reading</button> : completed ? <button className="small-button" type="button" onClick={() => onReopen(book.id)}><RotateCcw size={14} /> Reopen</button> : <div className="book-action-group"><button className="small-button" type="button" onClick={() => onProgress(book)}>Update progress</button><button className="small-button" type="button" onClick={() => onNote(book)}><Plus size={14} /> Add note</button><button className="small-button small-button--primary" type="button" onClick={() => onComplete(book.id)}><Check size={14} /> Mark complete</button></div>}<div className="card-actions"><button type="button" onClick={() => onEdit(book)} aria-label={`Edit ${book.title}`}><Pencil size={15} /></button><button type="button" onClick={() => onDelete(book)} aria-label={`Delete ${book.title}`}><Trash2 size={15} /></button></div></div></article>
})
