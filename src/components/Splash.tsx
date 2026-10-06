import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import logo from '../assets/logo-830.webp'
import { business } from '../config/business'
import { finishSplash } from '../lib/splash'

const HOLD_MS = 900 // logo visível; total da abertura ≈ 1,5s

/** Abertura: preto → logo → transição → site. Sem spinner nem barra de progresso. */
export default function Splash() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const t = window.setTimeout(() => setShow(false), reduced ? 250 : HOLD_MS)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence onExitComplete={finishSplash}>
      {show && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[100] grid place-items-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          role="presentation"
        >
          <motion.img
            src={logo}
            alt={`${business.name} ${business.tagline}`}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="w-[min(78vw,26rem)] select-none"
            width={830}
            height={210}
            fetchPriority="high"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
