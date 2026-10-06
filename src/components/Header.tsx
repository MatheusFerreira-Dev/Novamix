import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import logo from '../assets/logo-320.webp'
import { business } from '../config/business'

export const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Produtos', href: '#produtos' },
  { label: 'Troca de óleo', href: '#oleo-ideal' },
  { label: 'Agendamento', href: '#agendar' },
  { label: 'Sobre nós', href: '#sobre' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? 'border-b border-white/10 bg-ink/90 backdrop-blur-xl'
          : 'border-b border-transparent bg-gradient-to-b from-black/75 to-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:gap-6 sm:px-8">
        <a href="#inicio" aria-label={`${business.name} — início`} className="shrink-0">
          <img src={logo} alt={`${business.name} ${business.tagline}`} width={320} height={81} className="h-8 w-auto min-[400px]:h-9 sm:h-10" />
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-semibold text-white/75 transition hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="#agendar"
            className="inline-flex min-h-11 items-center rounded-full bg-accent px-4 text-xs font-bold min-[400px]:px-5 uppercase tracking-wider text-ink transition hover:bg-accent-hot hover:shadow-[0_0_28px_-6px_var(--color-accent)] sm:px-6 sm:text-sm"
          >
            Agendar<span className="hidden sm:inline">&nbsp;horário</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            className="grid size-10 place-items-center rounded-full border border-white/20 text-white min-[400px]:size-11 lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Menu mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100dvh - 4rem)' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="overflow-hidden lg:hidden"
          >
            <ul className="flex h-full flex-col justify-center gap-2 px-6 pb-16">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.05 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="display block border-b border-white/10 py-4 text-3xl"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
