import { BookOpen, Heart, House, Sparkles } from 'lucide-react'
import { NavLink } from 'react-router'

const links = [
  { to: '/', label: 'Home', Icon: House, end: true },
  { to: '/experiences', label: 'Experiences', Icon: Sparkles },
  { to: '/reading', label: 'Reading', Icon: BookOpen },
  { to: '/memories', label: 'Memories', Icon: Heart },
]

export function MobileNav() {
  return <nav className="mobile-nav" aria-label="Main navigation">{links.map(({ to, label, Icon, end }) => <NavLink key={to} to={to} end={end} className={({ isActive }) => `mobile-nav__link${isActive ? ' active' : ''}`}><Icon size={18} strokeWidth={1.8} /><span>{label}</span></NavLink>)}</nav>
}
