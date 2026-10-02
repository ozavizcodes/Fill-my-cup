import { useEffect } from 'react'
import { X } from 'lucide-react'
import type { Experience } from '../../types/experience'
import { ExperienceForm, type ExperienceDraft } from './ExperienceForm'

type ExperienceModalProps = { experience?: Experience; onClose: () => void; onSubmit: (draft: ExperienceDraft) => void }

export function ExperienceModal({ experience, onClose, onSubmit }: ExperienceModalProps) {
  useEffect(() => { const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }; window.addEventListener('keydown', closeOnEscape); return () => window.removeEventListener('keydown', closeOnEscape) }, [onClose])
  return <div className="modal-backdrop" role="presentation" onMouseDown={onClose}><section className="modal-card" role="dialog" aria-modal="true" aria-labelledby="experience-modal-title" onMouseDown={(event) => event.stopPropagation()}><div className="modal-header"><div><span className="eyebrow">Make room for more</span><h2 id="experience-modal-title" className="modal-title">{experience ? 'Edit experience' : 'Add experience'}</h2></div><button className="icon-button" type="button" onClick={onClose} aria-label="Close dialog"><X size={19} /></button></div><ExperienceForm key={experience?.id ?? 'new'} experience={experience} onCancel={onClose} onSubmit={onSubmit} /></section></div>
}
