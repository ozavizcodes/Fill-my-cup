import { NavLink } from 'react-router'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/experiences', label: 'Experiences' },
  { to: '/reading', label: 'Reading' },
  { to: '/memories', label: 'Memories' },
]

export function TopNav() {
  return <nav className="top-nav" aria-label="Main navigation">
    <NavLink className="brand" to="/">✨ Fill My Cup</NavLink>
    <div className="nav-links">{links.map(({ to, label, end }) => <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>{label}</NavLink>)}</div>
    <span className="season-pill">Oct — Dec 2026</span>
  </nav>
}
