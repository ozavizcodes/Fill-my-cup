import { Route, Routes } from 'react-router'
import { AppShell } from './components/layout/AppShell'
import { ExperiencesPage } from './pages/ExperiencesPage'
import { MemoriesPage } from './pages/MemoriesPage'
import { ReadingPage } from './pages/ReadingPage'
import { WelcomePage } from './pages/WelcomePage'

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<WelcomePage />} />
        <Route path="experiences" element={<ExperiencesPage />} />
        <Route path="reading" element={<ReadingPage />} />
        <Route path="memories" element={<MemoriesPage />} />
      </Route>
    </Routes>
  )
}

export default App
