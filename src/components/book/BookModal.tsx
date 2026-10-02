import { useState, type FormEvent } from 'react'
import { X } from 'lucide-react'
import type { Book, BookStatus } from '../../types/book'
import type { BookDraft } from '../../stores/bookStore'

type BookModalProps = { book?: Book; onClose: () => void; onSubmit: (draft: BookDraft) => void }

export function BookModal({ book, onClose, onSubmit }: BookModalProps) {
  const [title, setTitle] = useState(book?.title ?? '')
  const [author, setAuthor] = useState(book?.author ?? '')
  const [status, setStatus] = useState<BookStatus>(book?.status ?? 'planned')
  const [progress, setProgress] = useState(book?.progress ?? 0)
  const [error, setError] = useState('')
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); if (!title.trim() || !author.trim()) { setError('Please add a title and author.'); return } onSubmit({ title: title.trim(), author: author.trim(), status, progress: Number(progress) }) }
  return <div className="modal-backdrop" role="presentation" onMouseDown={onClose}><section className="modal-card" role="dialog" aria-modal="true" aria-labelledby="book-modal-title" onMouseDown={(event) => event.stopPropagation()}><div className="modal-header"><div><span className="eyebrow">A new chapter</span><h2 id="book-modal-title" className="modal-title">{book ? 'Edit book' : 'Add book'}</h2></div><button className="icon-button" type="button" onClick={onClose} aria-label="Close dialog"><X size={19} /></button></div><form className="experience-form" onSubmit={submit}><div className="form-field"><label htmlFor="book-title">Title *</label><input id="book-title" value={title} onChange={(event) => setTitle(event.target.value)} autoFocus /></div><div className="form-field"><label htmlFor="book-author">Author *</label><input id="book-author" value={author} onChange={(event) => setAuthor(event.target.value)} /></div><div className="form-field"><label htmlFor="book-status">Status</label><select id="book-status" value={status} onChange={(event) => setStatus(event.target.value as BookStatus)}><option value="planned">Planned</option><option value="reading">Reading</option><option value="completed">Completed</option></select></div><div className="form-field"><label htmlFor="book-progress">Progress: {progress}%</label><input id="book-progress" type="range" min="0" max="100" value={progress} onChange={(event) => setProgress(Number(event.target.value))} /></div>{error && <p className="form-error" role="alert">{error}</p>}<div className="modal-actions"><button className="button button--quiet" type="button" onClick={onClose}>Cancel</button><button className="button" type="submit">{book ? 'Save changes' : 'Add book'}</button></div></form></section></div>
}
