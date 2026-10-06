import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] ${
        light ? 'text-accent-deep' : 'text-accent'
      }`}
    >
      <span className="h-px w-8 bg-accent" />
      {children}
    </p>
  )
}

const base =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-sm font-bold uppercase tracking-wider transition duration-300 active:scale-[0.98]'

const variants = {
  primary: 'bg-accent text-ink hover:bg-accent-hot hover:shadow-[0_0_32px_-6px_var(--color-accent)]',
  ghost: 'border border-white/25 text-white hover:border-white hover:bg-white/10',
  dark: 'bg-ink text-white hover:bg-steel',
}

export function Button({
  href,
  variant = 'primary',
  children,
  external,
  className = '',
}: {
  href: string
  variant?: keyof typeof variants
  children: ReactNode
  external?: boolean
  className?: string
}) {
  return (
    <a
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}

export function ButtonAction({
  onClick,
  variant = 'primary',
  children,
  className = '',
}: {
  onClick: () => void
  variant?: keyof typeof variants
  children: ReactNode
  className?: string
}) {
  return (
    <button type="button" onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}

/** Aviso padrão ao lado dos CTAs que levam ao WhatsApp */
export function WhatsAppNote({ className = '', light = false }: { className?: string; light?: boolean }) {
  return (
    <p className={`flex items-center gap-2 text-xs sm:text-sm ${light ? 'text-neutral-600' : 'text-white/65'} ${className}`}>
      <WhatsAppIcon className="size-4 shrink-0 text-[#25d366]" />
      Você será direcionado para o WhatsApp com uma mensagem pronta.
    </p>
  )
}

export function WhatsAppIcon({ className = 'size-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.95L2 22l5.2-1.5A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.08.88.9-3-.2-.31a8.2 8.2 0 1 1 6.88 3.76Zm4.5-6.1c-.25-.12-1.46-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06a6.7 6.7 0 0 1-3.3-2.88c-.25-.43.25-.4.72-1.33.08-.16.04-.3-.02-.42-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.42h-.47a.9.9 0 0 0-.65.3c-.22.25-.85.83-.85 2.03s.87 2.36.99 2.52c.12.17 1.71 2.6 4.14 3.65 1.54.66 2.14.72 2.91.6.47-.07 1.46-.6 1.66-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  )
}

export function InstagramIcon({ className = 'size-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  )
}
