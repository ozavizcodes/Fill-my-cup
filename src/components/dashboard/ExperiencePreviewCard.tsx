import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { experienceCategoryMeta, type Experience } from '../../types/experience'

type ExperiencePreviewCardProps = { experience?: Experience }
const dateFormatter = new Intl.DateTimeFormat('en', { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' })

export function ExperiencePreviewCard({ experience }: ExperiencePreviewCardProps) {
  if (!experience) return <article className="next-card card"><div className="next-card__content"><span className="eyebrow">A little open space</span><h3>Time to dream</h3><p>Add an experience whenever inspiration arrives.</p><Link className="button" to="/experiences">Explore experiences <ArrowUpRight size={14} /></Link></div></article>
  const meta = experienceCategoryMeta[experience.category]
  const parsedDate = experience.date ? new Date(`${experience.date}T00:00:00Z`) : undefined
  const dateLabel = parsedDate && !Number.isNaN(parsedDate.getTime()) ? dateFormatter.format(parsedDate) : 'Coming up'
  return <motion.article className="next-card card" whileHover={{ y: -3 }} transition={{ duration: 0.2 }}><div className="next-card__content"><span className="eyebrow">{dateLabel}</span><h3>{meta.emoji} {experience.title}</h3><p>{experience.description?.trim() || 'A lovely little moment to look forward to.'}</p><Link className="button" to="/experiences">View experience <ArrowUpRight size={14} /></Link></div></motion.article>
}
