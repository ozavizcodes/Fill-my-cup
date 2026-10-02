import { useState, type FormEvent } from 'react'
import { X } from 'lucide-react'
import type { BookNote } from '../../types/book'
import type { BookNoteDraft } from '../../stores/bookStore'

type BookNoteModalProps = { note?: BookNote; onClose: () => void; onSubmit: (draft: BookNoteDraft) => void }

export function BookNoteModal({ note, onClose, onSubmit }: BookNoteModalProps) {
  const [text, setText] = useState(note?.text ?? '')
  const [chapter, setChapter] = useState(note?.chapter ?? '')
  const [page, setPage] = useState(note?.page ?? '')
  const [error, setError] = useState('')
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); if (!text.trim()) { setError('Please write a note first.'); return } onSubmit({ text: text.trim(), chapter: chapter.trim() || undefined, page: page.trim() || undefined }) }
  return <div className="modal-backdrop" role="presentation" onMouseDown={onClose}><section className="modal-card note-modal" role="dialog" aria-modal="true" aria-labelledby="note-modal-title" onMouseDown={(event) => event.stopPropagation()}><div className="modal-header"><div><span className="eyebrow">A thought to keep</span><h2 id="note-modal-title" className="modal-title">{note ? 'Edit note' : 'Add note'}</h2></div><button className="icon-button" type="button" onClick={onClose} aria-label="Close dialog"><X size={19} /></button></div><form className="experience-form" onSubmit={submit}><div className="form-field"><label htmlFor="note-text">Note *</label><textarea id="note-text" rows={5} value={text} onChange={(event) => setText(event.target.value)} autoFocus /></div><div className="note-fields"><div className="form-field"><label htmlFor="note-chapter">Chapter</label><input id="note-chapter" value={chapter} onChange={(event) => setChapter(event.target.value)} /></div><div className="form-field"><label htmlFor="note-page">Page</label><input id="note-page" value={page} onChange={(event) => setPage(event.target.value)} /></div></div>{error && <p className="form-error" role="alert">{error}</p>}<div className="modal-actions"><button className="button button--quiet" type="button" onClick={onClose}>Cancel</button><button className="button" type="submit">Save note</button></div></form></section></div>
}
