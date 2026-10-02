import { Link } from 'react-router'

type SectionHeaderProps = { eyebrow: string; title: string; action?: string; actionTo?: string }

export function SectionHeader({ eyebrow, title, action, actionTo }: SectionHeaderProps) {
  return <div className="section-header"><div><span className="eyebrow">{eyebrow}</span><h2 className="section-title">{title}</h2></div>{action && (actionTo ? <Link className="text-link" to={actionTo}>{action}</Link> : <button className="text-link" type="button">{action}</button>)}</div>
}
