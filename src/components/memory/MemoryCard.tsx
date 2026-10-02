import { memo } from 'react'
import type { Memory } from '../../types/memory'
import { formatCalendarDate } from '../../utils/dates'

type MemoryCardProps = {
  memory: Memory
  onEdit: (memory: Memory) => void
  onDelete: (memory: Memory) => void
}

export const MemoryCard = memo(function MemoryCard({ memory, onEdit, onDelete }: MemoryCardProps) {
  const formattedDate = formatCalendarDate(memory.date)

  return (
    <article className="memory-card card">
      <div className="memory-card__header">
        <span className="memory-emoji" aria-hidden="true">{memory.emoji || '✨'}</span>
        <div>
          <h2>{memory.title}</h2>
          <p className="memory-meta">
            {formattedDate && <time dateTime={memory.date}>{formattedDate}</time>}
            {memory.category && <span className="memory-category">{memory.category}</span>}
          </p>
        </div>
      </div>
      <p className="memory-description">{memory.description}</p>
      <div className="memory-card__actions">
        <button className="memory-action" type="button" onClick={() => onEdit(memory)}>Edit</button>
        <button className="memory-action" type="button" onClick={() => onDelete(memory)}>Delete</button>
      </div>
    </article>
  )
})
