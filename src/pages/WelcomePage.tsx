import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { useMemo } from 'react'
import { CategoryProgressCard } from '../components/dashboard/CategoryProgressCard'
import { ExperiencePreviewCard } from '../components/dashboard/ExperiencePreviewCard'
import { ProgressRing } from '../components/ui/ProgressRing'
import { SectionHeader } from '../components/ui/SectionHeader'
import { useExperienceStore } from '../stores/experienceStore'
import { useBookStore } from '../stores/bookStore'

const categories = [['📚', 'Reading', 60], ['🍝', 'Food & Recipes', 44], ['🌍', 'Travel & Adventure', 32], ['🎨', 'Creativity', 52], ['🏋🏽', 'Wellness', 37]] as const
const recentlyLived = [['🌸', 'Spa Day', 'A slow Sunday reset'], ['🍝', 'Tried a new recipe', 'Lemon herb pasta'], ['📚', 'Finished a book', 'The Housemaid']] as const
const entrance = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }

export function WelcomePage() {
  const experiences = useExperienceStore((state) => state.experiences)
  const books = useBookStore((state) => state.books)
  const { completedExperienceCount, percentage, nextExperience, dashboardCategories } = useMemo(() => {
    const completedExperienceCount = experiences.filter((experience) => experience.status === 'completed').length
    const nextExperience = experiences.filter((experience) => experience.status === 'planned').toSorted((a, b) => (a.date ?? '9999').localeCompare(b.date ?? '9999'))[0]
    const completedBooks = books.filter((book) => book.status === 'completed').length
    const readingBooks = books.filter((book) => book.status === 'reading').length
    const readingProgress = books.length ? Math.round(books.reduce((total, book) => total + book.progress, 0) / books.length) : 0
    return { completedExperienceCount, percentage: experiences.length ? Math.round((completedExperienceCount / experiences.length) * 100) : 0, nextExperience, dashboardCategories: [['📚', `Reading · ${readingBooks} reading, ${completedBooks} completed`, readingProgress], ...categories.slice(1)] as const }
  }, [books, experiences])
  return <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.08 }}>
    <motion.section className="page-intro" variants={entrance} transition={{ duration: 0.45 }}><span className="eyebrow">October — December 2026</span><h1 className="page-title">Good morning, Faith ✨</h1><p className="page-subtitle">Let's make the rest of 2026 count.</p></motion.section>
    <motion.section className="progress-card card" variants={entrance} transition={{ duration: 0.45 }}><div><span className="eyebrow">Your little season</span><h2 className="card-heading">{completedExperienceCount} / {experiences.length} experiences lived</h2><p className="card-copy">A beautifully ordinary life is built one meaningful moment at a time.</p></div><ProgressRing value={percentage} /></motion.section>
    <div className="dashboard-grid">
      <motion.section className="section next-experience" variants={entrance} transition={{ duration: 0.45 }}><SectionHeader eyebrow="Coming up" title="Your Next Experience" /><ExperiencePreviewCard experience={nextExperience} /></motion.section>
      <motion.section className="section" variants={entrance} transition={{ duration: 0.45 }}><SectionHeader eyebrow="A gentle overview" title="By category" /><div className="category-list">{dashboardCategories.map(([emoji, name, value]) => <CategoryProgressCard key={name} emoji={emoji} name={name} value={value} />)}</div></motion.section>
      <motion.aside className="section surprise-card card" variants={entrance} transition={{ duration: 0.45 }} whileHover={{ y: -2 }}><span className="surprise-icon"><Sparkles size={17} /></span><div><h3>Fill Your Cup</h3><p>A small idea for a little more delight today.</p></div><ArrowUpRight size={16} style={{ marginLeft: 'auto' }} aria-hidden="true" /></motion.aside>
    </div>
    <motion.section className="section" variants={entrance} transition={{ duration: 0.45 }}><SectionHeader eyebrow="A few good moments" title="Recently Lived" action="See all" /><div className="recent-list">{recentlyLived.map(([emoji, title, detail]) => <article className="recent-item card" key={title}><span className="recent-icon">{emoji}</span><div className="recent-copy"><strong>{title}</strong><span>{detail}</span></div></article>)}</div></motion.section>
  </motion.div>
}
