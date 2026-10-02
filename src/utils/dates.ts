const shortDate = new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
const featuredDate = new Intl.DateTimeFormat('en', { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' })

function parseCalendarDate(value?: string) {
  if (!value) return undefined
  const date = new Date(value.includes('T') ? value : `${value}T00:00:00Z`)
  return Number.isNaN(date.getTime()) ? undefined : date
}

/** Formats a date-only value, or the UTC calendar day of a timestamp, without shifting the day. */
export function formatCalendarDate(value?: string) {
  const date = parseCalendarDate(value)
  return date ? shortDate.format(date) : undefined
}

export function formatFeaturedDate(value?: string) {
  const date = parseCalendarDate(value)
  return date ? featuredDate.format(date) : undefined
}

const localDate = new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' })

/** Formats a real timestamp in the local calendar, so evening notes stay on the day they were written. */
export function formatTimestampDate(value?: string) {
  if (!value) return undefined
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : localDate.format(date)
}
