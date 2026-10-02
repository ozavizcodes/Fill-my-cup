import { useState } from 'react'
import { X } from 'lucide-react'
import type { Book } from '../../types/book'

type BookProgressModalProps = { book: Book; onClose: () => void; onSave: (progress: number) => void }

export function BookProgressModal({ book, onClose, onSave }: BookProgressModalProps) {
  const [progress, setProgress] = useState(book.progress)
  return <div className="modal-backdrop" role="presentation" onMouseDown={onClose}><section className="modal-card note-modal" role="dialog" aria-modal="true" aria-labelledby="progress-modal-title" onMouseDown={(event) => event.stopPropagation()}><div className="modal-header"><div><span className="eyebrow">A little further</span><h2 id="progress-modal-title" className="modal-title">Update progress</h2></div><button className="icon-button" type="button" onClick={onClose} aria-label="Close dialog"><X size={19} /></button></div><p className="progress-modal-copy">{book.title}</p><label className="book-range-label" htmlFor="reading-progress">{progress}% complete</label><input className="book-range" id="reading-progress" type="range" min="0" max="100" value={progress} onChange={(event) => setProgress(Number(event.target.value))} /><div className="modal-actions"><button className="button button--quiet" type="button" onClick={onClose}>Cancel</button><button className="button" type="button" onClick={() => { onSave(progress); onClose() }}>Save progress</button></div></section></div>
}
