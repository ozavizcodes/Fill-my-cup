import { AnimatePresence, motion } from 'framer-motion'
import { Plus, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { MemoryCard } from '../components/memory/MemoryCard'
import { MemoryModal } from '../components/memory/MemoryModal'
import { useMemoryStore } from '../stores/memoryStore'
import type { Memory } from '../types/memory'

export function MemoriesPage() {
  const memories = useMemoryStore((state) => state.memories)
  const addMemory = useMemoryStore((state) => state.addMemory)
  const updateMemory = useMemoryStore((state) => state.updateMemory)
  const deleteMemory = useMemoryStore((state) => state.deleteMemory)
  const [editing, setEditing] = useState<Memory | undefined>()
  const [isAdding, setIsAdding] = useState(false)
  const [deleting, setDeleting] = useState<Memory | undefined>()
  const journal = useMemo(() => memories.toSorted((a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt)), [memories])
  const closeModal = () => { setEditing(undefined); setIsAdding(false) }

  return (
    <motion.div className="memory-page" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <section className="experiences-hero">
        <div>
          <span className="eyebrow">A few good moments</span>
          <h1 className="page-title">Memories</h1>
          <p className="page-subtitle">Little moments worth keeping.</p>
        </div>
        <button className="button add-experience-button" type="button" onClick={() => setIsAdding(true)}><Plus size={16} /> Add memory</button>
      </section>
      {journal.length ? (
        <div className="memory-journal">
          <div className="memory-timeline">
            <AnimatePresence>
              {journal.map((memory) => (
                <div className="memory-entry" key={memory.id}>
                  <MemoryCard memory={memory} onEdit={setEditing} onDelete={setDeleting} />
                </div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <div className="empty-experiences card memory-empty">
          <span>✨</span>
          <h2>Nothing here yet.</h2>
          <p>Keep the little moments that make this season yours.</p>
          <button className="button" type="button" onClick={() => setIsAdding(true)}><Plus size={16} /> Add your first memory</button>
        </div>
      )}
      <AnimatePresence>
        {(isAdding || editing) && (
          <MemoryModal
            key={editing?.id ?? 'new'}
            memory={editing}
            onClose={closeModal}
            onSubmit={(draft) => {
              if (editing) updateMemory(editing.id, draft)
              else addMemory(draft)
              closeModal()
            }}
          />
        )}
        {deleting && (
          <motion.div className="modal-backdrop memory-modal-backdrop" role="presentation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <section className="confirm-card" role="dialog" aria-modal="true" aria-labelledby="delete-memory-title">
              <button className="icon-button confirm-close" type="button" onClick={() => setDeleting(undefined)} aria-label="Close dialog"><X size={18} /></button>
              <span className="eyebrow">A gentle check-in</span>
              <h2 id="delete-memory-title" className="modal-title">Remove this memory?</h2>
              <p>Are you sure you want to let this one go?</p>
              <div className="modal-actions">
                <button className="button button--quiet" type="button" onClick={() => setDeleting(undefined)}>Cancel</button>
                <button className="button button--danger" type="button" onClick={() => { deleteMemory(deleting.id); setDeleting(undefined) }}>Remove</button>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
