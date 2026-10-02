import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { useMemo } from 'react'
import { Link } from 'react-router'
import { CategoryProgressCard } from '../components/dashboard/CategoryProgressCard'
import { ExperiencePreviewCard } from '../components/dashboard/ExperiencePreviewCard'
import { ProgressRing } from '../components/ui/ProgressRing'
import { SectionHeader } from '../components/ui/SectionHeader'
import { useBookStore } from '../stores/bookStore'
import { useExperienceStore } from '../stores/experienceStore'
import { useMemoryStore } from '../stores/memoryStore'
import type { Book } from '../types/book'
import { experienceCategories, experienceCategoryMeta, type Experience } from '../types/experience'
import type { Memory } from '../types/memory'

const MotionLink = motion.create(Link)
const entrance = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }

const plannedStamp = (experience: Experience) => experience.date ?? '9999-99-99'
const livedStamp = (experience: Experience) => experience.completedAt ?? (experience.date ? `${experience.date}T00:00:00.000Z` : experience.createdAt)
const safePercent = (value: number) => Number.isFinite(value) ? Math.min(100, Math.max(0, Math.round(value))) : 0

export function WelcomePage() {
  const experiences = useExperienceStore((state) => state.experiences)
  const currentBook = useBookStore((state) => state.books.filter((book) => book.status === 'reading').toSorted((a, b) => (b.startedAt ?? '').localeCompare(a.startedAt ?? ''))[0])
  const latestMemory = useMemoryStore((state) => state.memories.reduce<Memory | undefined>((latest, memory) => !latest || memory.date > latest.date || (memory.date === latest.date && memory.createdAt > latest.createdAt) ? memory : latest, undefined))
  const { completedCount, percentage, nextExperience, categoryCards, recentlyLived } = useMemo(() => {
    const completed = experiences.filter((experience) => experience.status === 'completed')
    const categoryCards = experienceCategories.flatMap((category) => {
      const items = experiences.filter((experience) => experience.category === category)
      if (!items.length) return []
      const done = items.filter((experience) => experience.status === 'completed').length
      return [{ category, emoji: experienceCategoryMeta[category].emoji, name: experienceCategoryMeta[category].label, value: safePercent((done / items.length) * 100) }]
    })
    return {
      completedCount: completed.length,
      percentage: experiences.length ? safePercent((completed.length / experiences.length) * 100) : 0,
      nextExperience: experiences.filter((experience) => experience.status === 'planned').toSorted((a, b) => plannedStamp(a).localeCompare(plannedStamp(b)))[0],
      categoryCards,
      recentlyLived: completed.toSorted((a, b) => livedStamp(b).localeCompare(livedStamp(a))).slice(0, 3),
    }
  }, [experiences])

  return <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.08 }}>
    <motion.section className="page-intro" variants={entrance} transition={{ duration: 0.45 }}><span className="eyebrow">October — December 2026</span><h1 className="page-title">Good morning, Faith ✨</h1><p className="page-subtitle">Let's make the rest of 2026 count.</p></motion.section>
    <motion.section className="progress-card card" variants={entrance} transition={{ duration: 0.45 }}><div><span className="eyebrow">Your little season</span><h2 className="card-heading">{completedCount} / {experiences.length} experiences lived</h2><p className="card-copy">A beautifully ordinary life is built one meaningful moment at a time.</p></div><ProgressRing value={percentage} /></motion.section>
    <div className="dashboard-grid">
      <motion.section className="section next-experience" variants={entrance} transition={{ duration: 0.45 }}><SectionHeader eyebrow="Coming up" title="Your Next Experience" /><ExperiencePreviewCard experience={nextExperience} /></motion.section>
      <motion.section className="section" variants={entrance} transition={{ duration: 0.45 }}>
        <SectionHeader eyebrow="A gentle overview" title="By category" />
        <ReadingGlance book={currentBook} />
        {categoryCards.length ? <div className="category-list">{categoryCards.map((category) => <CategoryProgressCard key={category.category} emoji={category.emoji} name={category.name} value={category.value} />)}</div> : <p className="recent-empty">No experiences in the cup yet.</p>}
      </motion.section>
      <MotionLink className="section surprise-card card" to="/memories" variants={entrance} transition={{ duration: 0.45 }} whileHover={{ y: -2 }}>
        <span className="surprise-icon">{latestMemory ? latestMemory.emoji : <Sparkles size={17} />}</span>
        <div><h3>{latestMemory?.title ?? 'A recent moment'}</h3><p>{latestMemory?.description?.trim() || 'Keep a little moment when it feels worth remembering.'}</p></div>
        <ArrowUpRight size={16} style={{ marginLeft: 'auto' }} aria-hidden="true" />
      </MotionLink>
    </div>
    <motion.section className="section" variants={entrance} transition={{ duration: 0.45 }}>
      <SectionHeader eyebrow="A few good moments" title="Recently Lived" action="See all" actionTo="/experiences" />
      {recentlyLived.length ? <div className="recent-list">{recentlyLived.map((experience) => <article className="recent-item card" key={experience.id}><span className="recent-icon">{experienceCategoryMeta[experience.category].emoji}</span><div className="recent-copy"><strong>{experience.title}</strong><span>{experience.description?.trim() || experienceCategoryMeta[experience.category].label}</span></div></article>)}</div> : <p className="recent-empty">Nothing lived yet. Completed experiences will gather here.</p>}
    </motion.section>
  </motion.div>
}

function ReadingGlance({ book }: { book?: Book }) {
  const progress = safePercent(book?.progress ?? 0)
  return <Link className="recent-item card dashboard-reading" to="/reading"><span className="recent-icon">📖</span><div className="recent-copy"><strong>{book?.title ?? 'Nothing on the nightstand'}</strong><span>{book ? `${book.author} · ${progress}% complete` : 'Start a book whenever you feel ready.'}</span></div></Link>
}
