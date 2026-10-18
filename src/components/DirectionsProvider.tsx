import { AnimatePresence, motion } from 'framer-motion'
import { Clock, ExternalLink, MapPin, Phone, X } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { business, fullAddress, mapsDirectionsUrl, mapsEmbedUrl } from '../config/business'
import { DirectionsContext } from '../lib/directionsContext'
import { messages, waLink } from '../lib/whatsapp'
import { WhatsAppIcon } from './ui'

const focusable = 'a[href],button:not([disabled]),iframe,[tabindex]:not([tabindex="-1"])'

function DirectionsDialog({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return onClose()
      if (e.key !== 'Tab' || !ref.current) return
      const items = [...ref.current.querySelectorAll<HTMLElement>(focusable)].filter((el) => el.tagName !== 'IFRAME')
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      previous?.focus()
    }
  }, [onClose])

  const hours = business.hours.length
    ? business.hours.map((h) => `${h.label}: ${h.value}`).join('\n')
    : 'Consulte nossos horários pelo WhatsApp.'

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/80 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="directions-title"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative grid max-h-[92dvh] w-full max-w-5xl overflow-y-auto rounded-t-3xl border border-white/10 bg-graphite sm:rounded-3xl lg:grid-cols-[1fr_1.15fr] lg:overflow-hidden"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Fechar mapa"
          className="absolute right-3 top-3 z-10 grid size-11 place-items-center rounded-full bg-ink/80 backdrop-blur hover:bg-accent hover:text-ink"
        >
          <X className="size-5" />
        </button>

        <div className="order-2 p-6 sm:p-10 lg:order-1">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-accent">Como chegar</p>
          <h2 id="directions-title" className="display text-3xl sm:text-4xl">
            {business.name}
          </h2>
          <p className="mt-1 text-white/65">
            {business.tagline} · {business.city} - {business.state}
          </p>

          <dl className="mt-8 space-y-5">
            <div className="flex gap-4">
              <MapPin className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <dt className="text-xs font-bold uppercase tracking-widest text-white/60">Endereço</dt>
                <dd className="mt-1">
                  {business.address.street}
                  <br />
                  {business.address.neighborhood}, {business.address.city}
                  <br />
                  CEP {business.address.cep}
                </dd>
              </div>
            </div>
            <div className="flex gap-4">
              <Clock className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <dt className="text-xs font-bold uppercase tracking-widest text-white/60">Horário de funcionamento</dt>
                <dd className="mt-1 whitespace-pre-line">{hours}</dd>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <dt className="text-xs font-bold uppercase tracking-widest text-white/60">Telefone / WhatsApp</dt>
                <dd className="mt-1">
                  <a href={`tel:+${business.whatsappNumber}`} className="hover:text-accent">
                    {business.phoneDisplay}
                  </a>
                </dd>
              </div>
            </div>
          </dl>

          <p className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-white/70">
            A loja fica no Centro de Jarinu. Antes de vir, confirme o horário de atendimento pelo WhatsApp.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-bold uppercase tracking-wider text-ink hover:bg-accent-hot"
            >
              <ExternalLink className="size-4" aria-hidden="true" /> Abrir no Google Maps
            </a>
            <a
              href={waLink(messages.hours)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 px-6 text-sm font-bold uppercase tracking-wider hover:bg-white/10"
            >
              <WhatsAppIcon className="size-4 text-[#25d366]" /> Falar no WhatsApp
            </a>
          </div>
        </div>

        <div className="order-1 h-64 sm:h-80 lg:order-2 lg:h-auto lg:min-h-[32rem]">
          <iframe
            title={`Mapa — ${fullAddress}`}
            src={mapsEmbedUrl}
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0"
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function DirectionsProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const openDirections = useCallback(() => {
    // celular/tablet de toque: abre direto o Google Maps (app ou site) já com a rota, sem tela intermediária
    const isMobile = window.matchMedia('(max-width: 767px), (pointer: coarse) and (max-width: 1024px)').matches
    if (isMobile) {
      const win = window.open(mapsDirectionsUrl, '_blank', 'noopener,noreferrer')
      if (!win) window.location.href = mapsDirectionsUrl // pop-up bloqueado: navega na mesma aba
      return
    }
    setOpen(true) // desktop: mapa dentro do próprio site
  }, [])
  const close = useCallback(() => setOpen(false), [])
  const value = useMemo(() => ({ openDirections }), [openDirections])

  return (
    <DirectionsContext.Provider value={value}>
      {children}
      <AnimatePresence>{open && <DirectionsDialog onClose={close} />}</AnimatePresence>
    </DirectionsContext.Provider>
  )
}
