import { motion } from 'framer-motion'

type CategoryProgressCardProps = { emoji: string; name: string; value: number }

export function CategoryProgressCard({ emoji, name, value }: CategoryProgressCardProps) {
  return <article className="category-card card"><div className="category-card__top"><span className="category-name">{emoji} {name}</span><span className="category-percent">{value}%</span></div><div className="progress-track"><motion.div className="progress-value" initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 0.7, ease: 'easeOut' }} /></div></article>
}
