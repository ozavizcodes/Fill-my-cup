import { motion } from 'framer-motion'
import { Check, Pencil, RotateCcw, Trash2 } from 'lucide-react'
import { memo } from 'react'
import { experienceCategoryMeta, type Experience } from '../../types/experience'
import { formatCalendarDate } from '../../utils/dates'

type ExperienceCardProps = { experience: Experience; onEdit: (experience: Experience) => void; onDelete: (experience: Experience) => void; onComplete: (id: string) => void; onReopen: (id: string) => void }

export const ExperienceCard = memo(function ExperienceCard({ experience, onEdit, onDelete, onComplete, onReopen }: ExperienceCardProps) {
  const meta = experienceCategoryMeta[experience.category]
  const isCompleted = experience.status === 'completed'
  const formattedDate = formatCalendarDate(experience.date)
  return <motion.article className={`experience-card card${isCompleted ? ' is-completed' : ''}`} exit={{ opacity: 0 }} transition={{ duration: 0.16 }}><div className="experience-card__top"><span className="experience-category">{meta.emoji} {meta.label}</span><span className={`status-badge ${isCompleted ? 'completed' : ''}`}>{isCompleted ? 'Completed ✓' : 'Planned'}</span></div><h2>{experience.title}</h2>{formattedDate && <p className="experience-date"><time dateTime={experience.date}>{formattedDate}</time></p>}{experience.description && <p className="experience-description">{experience.description}</p>}<div className="experience-card__actions">{isCompleted ? <button className="small-button" type="button" onClick={() => onReopen(experience.id)}><RotateCcw size={14} /> Reopen</button> : <button className="small-button small-button--primary" type="button" onClick={() => onComplete(experience.id)}><Check size={14} /> Mark complete</button>}<div className="card-actions"><button type="button" onClick={() => onEdit(experience)} aria-label={`Edit ${experience.title}`}><Pencil size={15} /></button><button type="button" onClick={() => onDelete(experience)} aria-label={`Delete ${experience.title}`}><Trash2 size={15} /></button></div></div></motion.article>
})
