import type { Memory } from '../types/memory'

/** Temporary sample memories so the journal can be reviewed. Safe to replace or remove. */
const rememberedAt = (date: string) => `${date}T12:00:00.000Z`

export const seedMemories: Memory[] = [
  { id: 'spa-day', title: 'Spa Day', date: '2026-10-01', description: 'A slow afternoon of steam, quiet, and nowhere to be.', category: 'Wellness', emoji: '🌸', createdAt: rememberedAt('2026-10-01'), updatedAt: rememberedAt('2026-10-01') },
  { id: 'new-recipe', title: 'Tried a new recipe', date: '2026-09-27', description: 'Lemon herb pasta, eaten at the table with the window open.', category: 'Food', emoji: '🍝', createdAt: rememberedAt('2026-09-27'), updatedAt: rememberedAt('2026-09-27') },
  { id: 'girls-day', title: 'A good girls’ day', date: '2026-09-20', description: 'Long lunch, easy laughter, and no one checking the time.', category: 'Relationships', emoji: '🫶🏽', createdAt: rememberedAt('2026-09-20'), updatedAt: rememberedAt('2026-09-20') },
  { id: 'quiet-sunday', title: 'A quiet Sunday', date: '2026-09-14', description: 'Coffee, a soft jumper, and the whole morning unplanned.', category: 'Rest', emoji: '☕️', createdAt: rememberedAt('2026-09-14'), updatedAt: rememberedAt('2026-09-14') },
  { id: 'finished-a-book', title: 'Finished a book', date: '2026-09-07', description: 'Closed the last page and sat with it for a while.', category: 'Reading', emoji: '📚', createdAt: rememberedAt('2026-09-07'), updatedAt: rememberedAt('2026-09-07') },
]
