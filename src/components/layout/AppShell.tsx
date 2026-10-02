import { Outlet } from 'react-router'
import { MobileNav } from './MobileNav'
import { TopNav } from './TopNav'

/** Shared application frame; navigation will be added when the product UI begins. */
export function AppShell() {
  return (
    <div className="app-shell">
      <header className="shell-width">
        <TopNav />
        <div className="mobile-header"><span className="brand">✨ Fill My Cup</span><span className="season-pill">Oct — Dec</span></div>
      </header>
      <main className="shell-width main-content">
        <Outlet />
      </main>
      <MobileNav />
    </div>
  )
}
