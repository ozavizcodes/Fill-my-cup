import { motion } from 'framer-motion'
import type { Memory } from '../../types/memory'

type MemoryCardProps = {
  memory: Memory
  onEdit: (memory: Memory) => void
  onDelete: (memory: Memory) => void
}

const dateFormatter = new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })

export function MemoryCard({ memory, onEdit, onDelete }: MemoryCardProps) {
  const formattedDate = dateFormatter.format(new Date(`${memory.date}T00:00:00Z`))

  return (
    <motion.article className="memory-card card" exit={{ opacity: 0, y: 8 }} whileHover={{ y: -2 }} transition={{ duration: 0.16 }}>
      <div className="memory-card__header">
        <span className="memory-emoji" aria-hidden="true">{memory.emoji || '✨'}</span>
        <div>
          <h2>{memory.title}</h2>
          <p className="memory-meta">
            <time dateTime={memory.date}>{formattedDate}</time>
            {memory.category && <span className="memory-category">{memory.category}</span>}
          </p>
        </div>
      </div>
      <p className="memory-description">{memory.description}</p>
      <div className="memory-card__actions">
        <button className="memory-action" type="button" onClick={() => onEdit(memory)}>Edit</button>
        <button className="memory-action" type="button" onClick={() => onDelete(memory)}>Delete</button>
      </div>
    </motion.article>
  )
}
