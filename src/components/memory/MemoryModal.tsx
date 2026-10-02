import { useEffect, useState, type FormEvent } from 'react'
import { X } from 'lucide-react'
import type { MemoryDraft } from '../../stores/memoryStore'
import { memoryCategories, type Memory } from '../../types/memory'

type MemoryModalProps = {
  memory?: Memory
  onClose: () => void
  onSubmit: (draft: MemoryDraft) => void
}

const defaultEmoji = '✨'

export function MemoryModal({ memory, onClose, onSubmit }: MemoryModalProps) {
  const [title, setTitle] = useState(memory?.title ?? '')
  const [date, setDate] = useState(memory?.date ?? '')
  const [category, setCategory] = useState(memory?.category ?? memoryCategories[0])
  const [emoji, setEmoji] = useState(memory?.emoji ?? defaultEmoji)
  const [description, setDescription] = useState(memory?.description ?? '')
  const [error, setError] = useState('')

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [onClose])

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!title.trim() || !date || !description.trim()) {
      setError('Please add a title, date, and description.')
      return
    }
    onSubmit({
      title: title.trim(),
      date,
      category,
      emoji: emoji.trim() || defaultEmoji,
      description: description.trim(),
    })
  }

  return (
    <div className="modal-backdrop memory-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="modal-card" role="dialog" aria-modal="true" aria-labelledby="memory-modal-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="eyebrow">A moment to keep</span>
            <h2 id="memory-modal-title" className="modal-title">{memory ? 'Edit memory' : 'Add memory'}</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close dialog"><X size={19} /></button>
        </div>
        <form className="experience-form" onSubmit={submit}>
          <div className="form-field">
            <label htmlFor="memory-title">Title <span aria-hidden="true">*</span></label>
            <input id="memory-title" value={title} onChange={(event) => setTitle(event.target.value)} autoFocus required />
          </div>
          <div className="form-field">
            <label htmlFor="memory-date">Date <span aria-hidden="true">*</span></label>
            <input id="memory-date" type="date" value={date} onChange={(event) => setDate(event.target.value)} required />
          </div>
          <div className="form-field">
            <label htmlFor="memory-category">Category</label>
            <select id="memory-category" value={category} onChange={(event) => setCategory(event.target.value)}>
              {memoryCategories.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="memory-emoji">Emoji</label>
            <input id="memory-emoji" value={emoji} onChange={(event) => setEmoji(event.target.value)} maxLength={8} aria-describedby="memory-emoji-hint" />
            <span id="memory-emoji-hint" className="field-hint">A small symbol for this moment. ✨ is a gentle default.</span>
          </div>
          <div className="form-field">
            <label htmlFor="memory-description">Description <span aria-hidden="true">*</span></label>
            <textarea id="memory-description" rows={4} value={description} onChange={(event) => setDescription(event.target.value)} required />
          </div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="modal-actions">
            <button className="button button--quiet" type="button" onClick={onClose}>Cancel</button>
            <button className="button" type="submit">Save memory</button>
          </div>
        </form>
      </section>
    </div>
  )
}
