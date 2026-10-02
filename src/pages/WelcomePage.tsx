import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { useMemo } from 'react'
import { CategoryProgressCard } from '../components/dashboard/CategoryProgressCard'
import { ExperiencePreviewCard } from '../components/dashboard/ExperiencePreviewCard'
import { ProgressRing } from '../components/ui/ProgressRing'
import { SectionHeader } from '../components/ui/SectionHeader'
import { useExperienceStore } from '../stores/experienceStore'
import { useMemoryStore } from '../stores/memoryStore'
import { experienceCategoryMeta, type ExperienceCategory } from '../types/experience'

const dashboardCategories = ['reading', 'food', 'travel', 'creativity', 'wellness'] as const satisfies readonly ExperienceCategory[]
const entrance = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }

export function WelcomePage() {
  const experiences = useExperienceStore((state) => state.experiences)
  const memories = useMemoryStore((state) => state.memories)
  const { completedExperienceCount, percentage, nextExperience, categoryCards, recentMemories } = useMemo(() => {
    const completedExperienceCount = experiences.filter((experience) => experience.status === 'completed').length
    const nextExperience = experiences.filter((experience) => experience.status === 'planned').toSorted((a, b) => (a.date ?? '9999').localeCompare(b.date ?? '9999'))[0]
    const categoryCards = dashboardCategories.map((category) => {
      const items = experiences.filter((experience) => experience.category === category)
      const completed = items.filter((experience) => experience.status === 'completed').length
      return { emoji: experienceCategoryMeta[category].emoji, name: experienceCategoryMeta[category].label, value: items.length ? Math.round((completed / items.length) * 100) : 0 }
    })
    const recentMemories = memories.toSorted((a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt)).slice(0, 3)
    return { completedExperienceCount, percentage: experiences.length ? Math.round((completedExperienceCount / experiences.length) * 100) : 0, nextExperience, categoryCards, recentMemories }
  }, [experiences, memories])
  return <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.08 }}>
    <motion.section className="page-intro" variants={entrance} transition={{ duration: 0.45 }}><span className="eyebrow">October — December 2026</span><h1 className="page-title">Good morning, Faith ✨</h1><p className="page-subtitle">Let's make the rest of 2026 count.</p></motion.section>
    <motion.section className="progress-card card" variants={entrance} transition={{ duration: 0.45 }}><div><span className="eyebrow">Your little season</span><h2 className="card-heading">{completedExperienceCount} / {experiences.length} experiences lived</h2><p className="card-copy">A beautifully ordinary life is built one meaningful moment at a time.</p></div><ProgressRing value={percentage} /></motion.section>
    <div className="dashboard-grid">
      <motion.section className="section next-experience" variants={entrance} transition={{ duration: 0.45 }}><SectionHeader eyebrow="Coming up" title="Your Next Experience" /><ExperiencePreviewCard experience={nextExperience} /></motion.section>
      <motion.section className="section" variants={entrance} transition={{ duration: 0.45 }}><SectionHeader eyebrow="A gentle overview" title="By category" /><div className="category-list">{categoryCards.map((category) => <CategoryProgressCard key={category.name} emoji={category.emoji} name={category.name} value={category.value} />)}</div></motion.section>
      <motion.aside className="section surprise-card card" variants={entrance} transition={{ duration: 0.45 }} whileHover={{ y: -2 }}><span className="surprise-icon"><Sparkles size={17} /></span><div><h3>Fill Your Cup</h3><p>A small idea for a little more delight today.</p></div><ArrowUpRight size={16} style={{ marginLeft: 'auto' }} aria-hidden="true" /></motion.aside>
    </div>
    <motion.section className="section" variants={entrance} transition={{ duration: 0.45 }}><SectionHeader eyebrow="A few good moments" title="Recently Lived" action="See all" actionTo="/memories" /><div className="recent-list">{recentMemories.length ? recentMemories.map((memory) => <article className="recent-item card" key={memory.id}><span className="recent-icon">{memory.emoji}</span><div className="recent-copy"><strong>{memory.title}</strong><span>{memory.description}</span></div></article>) : <p className="recent-empty">Nothing kept yet. The little moments will gather here.</p>}</div></motion.section>
  </motion.div>
}
