import { Pencil, Trash2 } from 'lucide-react'
import type { BookNote } from '../../types/book'

type BookNoteCardProps = { note: BookNote; onEdit: (note: BookNote) => void; onDelete: (note: BookNote) => void }
const dateFormatter = new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', timeZone: 'UTC' })

export function BookNoteCard({ note, onEdit, onDelete }: BookNoteCardProps) {
  const location = [note.chapter && `Chapter ${note.chapter}`, note.page && `Page ${note.page}`].filter(Boolean).join(' · ')
  return <article className="book-note card"><div className="book-note__top"><span>{location || 'A thought to keep'}</span><div className="card-actions"><button type="button" onClick={() => onEdit(note)} aria-label="Edit note"><Pencil size={14} /></button><button type="button" onClick={() => onDelete(note)} aria-label="Delete note"><Trash2 size={14} /></button></div></div><p>“{note.text}”</p><time>{dateFormatter.format(new Date(note.createdAt))}</time></article>
}
