import { MotionConfig } from 'framer-motion'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import DirectionsProvider from './components/DirectionsProvider'
import { findPage } from './data/pages'
import LandingPage from './pages/LandingPage'

// Entrada das páginas locais (/troca-de-oleo-jarinu/, etc.). O caminho vem do data-path do <html>.
const path = document.documentElement.dataset.path ?? window.location.pathname
const page = findPage(path.endsWith('/') ? path : `${path}/`)

const root = document.getElementById('root')
if (root && page) {
  createRoot(root).render(
    <StrictMode>
      <MotionConfig reducedMotion="user">
        <DirectionsProvider>
          <LandingPage page={page} />
        </DirectionsProvider>
      </MotionConfig>
    </StrictMode>,
  )
}
