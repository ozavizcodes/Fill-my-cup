import type { ExperienceCategory } from '../../types/experience'
import { experienceCategories, experienceCategoryMeta } from '../../types/experience'

export type ExperienceStatusFilter = 'all' | 'upcoming' | 'completed'
type ExperienceFiltersProps = { status: ExperienceStatusFilter; category: ExperienceCategory | 'all'; onStatusChange: (status: ExperienceStatusFilter) => void; onCategoryChange: (category: ExperienceCategory | 'all') => void }

export function ExperienceFilters({ status, category, onStatusChange, onCategoryChange }: ExperienceFiltersProps) {
  return <div className="experience-filters"><div className="filter-tabs" aria-label="Experience status filter">{(['all', 'upcoming', 'completed'] as const).map((item) => <button key={item} className={`filter-tab${status === item ? ' active' : ''}`} onClick={() => onStatusChange(item)} type="button">{item === 'all' ? 'All' : item === 'upcoming' ? 'Upcoming' : 'Completed'}</button>)}</div><label className="category-select"><span className="sr-only">Filter by category</span><select value={category} onChange={(event) => onCategoryChange(event.target.value as ExperienceCategory | 'all')}><option value="all">All categories</option>{experienceCategories.map((item) => <option key={item} value={item}>{experienceCategoryMeta[item].emoji} {experienceCategoryMeta[item].label}</option>)}</select></label></div>
}
