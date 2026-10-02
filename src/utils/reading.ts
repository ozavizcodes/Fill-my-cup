import { useExperienceStore } from '../stores/experienceStore'

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '')

export function syncReadingExperience(bookTitle: string, completed: boolean) {
  const expectedTitle = normalize(`Read ${bookTitle}`)
  const experience = useExperienceStore.getState().experiences.find((item) => {
    const title = normalize(item.title)
    return item.category === 'reading' && (title === expectedTitle || title.startsWith(expectedTitle) || expectedTitle.startsWith(title))
  })
  if (!experience) return
  if (completed) useExperienceStore.getState().completeExperience(experience.id)
  else useExperienceStore.getState().reopenExperience(experience.id)
}
