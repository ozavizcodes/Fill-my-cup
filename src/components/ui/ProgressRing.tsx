import { motion } from 'framer-motion'

type ProgressRingProps = { value: number }

export function ProgressRing({ value }: ProgressRingProps) {
  const safeValue = Number.isFinite(value) ? Math.min(100, Math.max(0, Math.round(value))) : 0
  return <motion.div className="progress-ring" style={{ '--progress': `${safeValue * 3.6}deg` } as React.CSSProperties} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.25, duration: 0.5 }}><div className="progress-ring__inner"><strong>{safeValue}%</strong><span>complete</span></div></motion.div>
}
