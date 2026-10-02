type SectionHeaderProps = { eyebrow: string; title: string; action?: string }

export function SectionHeader({ eyebrow, title, action }: SectionHeaderProps) {
  return <div className="section-header"><div><span className="eyebrow">{eyebrow}</span><h2 className="section-title">{title}</h2></div>{action && <button className="text-link" type="button">{action}</button>}</div>
}
