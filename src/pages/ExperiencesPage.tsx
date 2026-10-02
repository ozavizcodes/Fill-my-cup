import { AnimatePresence, motion } from 'framer-motion'
import { Plus, X } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { ExperienceCard } from '../components/activity/ExperienceCard'
import { ExperienceFilters, type ExperienceStatusFilter } from '../components/activity/ExperienceFilters'
import { ExperienceModal } from '../components/activity/ExperienceModal'
import { useExperienceStore } from '../stores/experienceStore'
import { useCloseOnEscape } from '../utils/useCloseOnEscape'
import type { Experience, ExperienceCategory } from '../types/experience'

export function ExperiencesPage() {
  const experiences = useExperienceStore((state) => state.experiences)
  const addExperience = useExperienceStore((state) => state.addExperience)
  const updateExperience = useExperienceStore((state) => state.updateExperience)
  const deleteExperience = useExperienceStore((state) => state.deleteExperience)
  const completeExperience = useExperienceStore((state) => state.completeExperience)
  const reopenExperience = useExperienceStore((state) => state.reopenExperience)
  const [status, setStatus] = useState<ExperienceStatusFilter>('all')
  const [category, setCategory] = useState<ExperienceCategory | 'all'>('all')
  const [editing, setEditing] = useState<Experience | undefined>()
  const [isAdding, setIsAdding] = useState(false)
  const [deleting, setDeleting] = useState<Experience | undefined>()
  const filteredExperiences = useMemo(() => experiences.filter((experience) => (status === 'all' || status === 'upcoming' ? status === 'all' || experience.status === 'planned' : experience.status === 'completed') && (category === 'all' || experience.category === category)).sort((a, b) => (a.date ?? '9999').localeCompare(b.date ?? '9999')), [category, experiences, status])
  const closeModal = () => { setEditing(undefined); setIsAdding(false) }
  const cancelDelete = useCallback(() => setDeleting(undefined), [])
  useCloseOnEscape(cancelDelete)

  return <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
    <section className="experiences-hero"><div><span className="eyebrow">Your little season</span><h1 className="page-title">Experiences</h1><p className="page-subtitle">All the little things I’m making room for.</p></div><button className="button add-experience-button" type="button" onClick={() => setIsAdding(true)}><Plus size={16} /> Add experience</button></section>
    <ExperienceFilters status={status} category={category} onStatusChange={setStatus} onCategoryChange={setCategory} />
    {filteredExperiences.length ? <div className="experiences-grid"><AnimatePresence>{filteredExperiences.map((experience) => <ExperienceCard key={experience.id} experience={experience} onEdit={setEditing} onDelete={setDeleting} onComplete={completeExperience} onReopen={reopenExperience} />)}</AnimatePresence></div> : <div className="empty-experiences card"><span>✨</span><h2>Space for something lovely</h2><p>{experiences.length ? 'No experiences match these filters yet.' : 'Add the first thing you want to make room for.'}</p></div>}
    {(isAdding || editing) && <ExperienceModal experience={editing} onClose={closeModal} onSubmit={(draft) => { if (editing) updateExperience(editing.id, draft); else addExperience(draft); closeModal() }} />}
    <AnimatePresence>{deleting && <motion.div className="modal-backdrop" role="presentation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><section className="confirm-card" role="dialog" aria-modal="true" aria-labelledby="delete-title"><button className="icon-button confirm-close" type="button" onClick={() => setDeleting(undefined)} aria-label="Close dialog"><X size={18} /></button><span className="eyebrow">A gentle check-in</span><h2 id="delete-title" className="modal-title">Remove this experience?</h2><p>Are you sure you want to remove this from your cup?</p><div className="modal-actions"><button className="button button--quiet" type="button" onClick={() => setDeleting(undefined)}>Cancel</button><button className="button button--danger" type="button" onClick={() => { deleteExperience(deleting.id); setDeleting(undefined) }}>Remove</button></div></section></motion.div>}</AnimatePresence>
  </motion.div>
}
