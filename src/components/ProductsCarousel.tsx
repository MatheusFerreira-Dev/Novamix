import { animate, motion, useMotionValue } from 'framer-motion'
import { ArrowLeft, ArrowRight, ChevronsRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { products } from '../data/products'
import { messages, waLink } from '../lib/whatsapp'
import ProductSlide from './ProductSlide'
import { Eyebrow, Reveal, WhatsAppIcon, WhatsAppNote } from './ui'

const GAP = 16
const AUTOPLAY_MS = 7000 // lento o bastante para ler os cards
const AFTER_INTERACTION_MS = 5000 // pausa extra após interação manual
const SWIPE = 50 // px de arrasto para trocar de card
const SWIPE_VELOCITY = 500 // px/s: um "peteleco" rápido também troca
const SPRING = { type: 'spring', stiffness: 260, damping: 32 } as const

const perViewFor = (w: number) => (w >= 1280 ? 4 : w >= 1024 ? 3 : w >= 640 ? 2 : 1)

/** Vitrine horizontal: vários cards visíveis, autoplay, setas, dots e swipe/drag. */
export default function ProductsCarousel() {
  const viewport = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const x = useMotionValue(0)
  const fade = useMotionValue(1) // usado só na volta do último para o primeiro card
  const [width, setWidth] = useState(0)
  const [viewportW, setViewportW] = useState(0)
  const [index, setIndex] = useState(0)
  const indexRef = useRef(0)
  const elapsed = useRef(0)
  const dragged = useRef(false)
  const jumping = useRef(false)
  const flags = useRef({ hover: false, focus: false, drag: false, visible: false, reduced: false })

  const perView = perViewFor(viewportW || 1280)
  const cardW = width ? (width - GAP * (perView - 1)) / perView : 0
  const step = cardW + GAP
  const maxIndex = Math.max(0, products.length - perView)
  const positions = maxIndex + 1

  // valores atuais acessíveis dentro dos callbacks sem recriá-los
  const stepRef = useRef(step)
  const maxRef = useRef(maxIndex)
  useEffect(() => {
    stepRef.current = step
    maxRef.current = maxIndex
  }, [step, maxIndex])

  useEffect(() => {
    const el = viewport.current
    if (!el) return
    const measure = () => {
      setWidth(el.clientWidth)
      setViewportW(window.innerWidth)
    }
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    measure()
    return () => ro.disconnect()
  }, [])

  const commit = useCallback((i: number) => {
    indexRef.current = i
    setIndex(i)
  }, [])

  // posiciona o trilho quando o card ativo ou o tamanho da tela mudam
  useEffect(() => {
    const i = Math.min(index, maxIndex)
    if (i !== index) indexRef.current = i
    if (jumping.current) {
      jumping.current = false
      x.stop()
      x.set(-i * step)
      return
    }
    const controls = animate(x, -i * step, SPRING)
    return () => controls.stop()
  }, [index, step, maxIndex, x, commit])

  // volta do último para o primeiro (e saltos longos): esmaece, troca de posição e reaparece.
  // Nunca "varre" todos os cards no caminho.
  const jump = useCallback(
    (target: number) => {
      animate(fade, 0, { duration: 0.14 }).then(() => {
        jumping.current = true
        x.stop()
        x.set(-target * stepRef.current)
        commit(target)
        animate(fade, 1, { duration: 0.22 })
      })
    },
    [fade, x, commit],
  )

  const go = useCallback(
    (delta: number, manual = false) => {
      elapsed.current = manual ? -AFTER_INTERACTION_MS : 0
      const n = indexRef.current + delta
      if (n > maxRef.current) jump(0)
      else if (n < 0) jump(maxRef.current)
      else commit(n)
    },
    [jump, commit],
  )

  const goToDot = (i: number) => {
    elapsed.current = -AFTER_INTERACTION_MS
    if (Math.abs(i - indexRef.current) > 2) jump(i)
    else commit(i)
  }

  // autoplay: só conta quando visível e sem interação (hover, foco, arrasto)
  useEffect(() => {
    flags.current.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const io = new IntersectionObserver(([e]) => (flags.current.visible = e.isIntersecting), { threshold: 0.3 })
    if (sectionRef.current) io.observe(sectionRef.current)
    // temporizador leve (5x por segundo) em vez de um laço a cada frame
    const TICK = 200
    const timer = window.setInterval(() => {
      const f = flags.current
      if (f.reduced || document.hidden || !f.visible || f.hover || f.focus || f.drag) return
      elapsed.current += TICK
      if (elapsed.current >= AUTOPLAY_MS) go(1)
    }, TICK)
    return () => {
      clearInterval(timer)
      io.disconnect()
    }
  }, [go])

  const arrow = 'grid size-11 shrink-0 place-items-center rounded-full border-2 border-accent/70 text-white transition hover:border-accent hover:bg-accent hover:text-ink'

  return (
    <section
      id="produtos"
      ref={sectionRef}
      className="bg-ink py-12 sm:py-16"
      aria-roledescription="carrossel"
      aria-label="Produtos e acessórios"
      onMouseEnter={() => (flags.current.hover = true)}
      onMouseLeave={() => (flags.current.hover = false)}
      onFocus={() => (flags.current.focus = true)}
      onBlur={() => (flags.current.focus = false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1, true)
        if (e.key === 'ArrowLeft') go(-1, true)
      }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>Produtos e acessórios</Eyebrow>
            <h2 className="display text-[clamp(1.9rem,3.8vw,3rem)]">Produtos para cuidar do seu carro.</h2>
            <p className="mt-3 text-base text-white/75">
              Óleos, filtros e acessórios automotivos em Jarinu: do óleo aos pequenos detalhes, cuide do seu carro por completo.
            </p>
          </div>
          <div className="shrink-0">
            <a
              href={waLink(messages.products)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-bold uppercase tracking-wider text-ink transition hover:bg-accent-hot sm:w-auto"
            >
              <WhatsAppIcon className="size-5" /> Falar no WhatsApp
            </a>
            <WhatsAppNote className="mt-2" />
          </div>
        </Reveal>

        {/* vitrine */}
        <div className="relative mt-6 md:px-6">
          <button type="button" onClick={() => go(-1, true)} aria-label="Produto anterior" className={`${arrow} absolute -left-3 top-1/2 z-10 hidden -translate-y-1/2 bg-ink md:grid`}>
            <ArrowLeft className="size-5" />
          </button>
          <button type="button" onClick={() => go(1, true)} aria-label="Próximo produto" className={`${arrow} absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 bg-ink md:grid`}>
            <ArrowRight className="size-5" />
          </button>

          {/* a janela precisa recortar os cards que estão fora da vista (é o próprio carrossel) */}
          <motion.div ref={viewport} className="overflow-hidden" style={{ opacity: fade }}>
            <motion.ul
              className="flex cursor-grab active:cursor-grabbing"
              style={{ x, gap: GAP, touchAction: 'pan-y' }}
              drag="x"
              dragConstraints={{ left: -maxIndex * step, right: 0 }}
              dragElastic={0.12}
              dragMomentum={false}
              onDragStart={() => {
                flags.current.drag = true
                dragged.current = true
              }}
              onDragEnd={(_, info) => {
                flags.current.drag = false
                window.setTimeout(() => (dragged.current = false), 0)
                const cur = indexRef.current
                let target = cur
                if (info.offset.x < -SWIPE || info.velocity.x < -SWIPE_VELOCITY) target = Math.min(cur + 1, maxIndex)
                else if (info.offset.x > SWIPE || info.velocity.x > SWIPE_VELOCITY) target = Math.max(cur - 1, 0)
                elapsed.current = -AFTER_INTERACTION_MS
                if (target !== cur) commit(target)
                else animate(x, -cur * step, SPRING) // não passou do limite: volta para o card atual (e não para o começo)
              }}
              // depois de arrastar com o mouse, o "soltar" não deve abrir o link do card
              onClickCapture={(e) => {
                if (dragged.current) {
                  e.preventDefault()
                  e.stopPropagation()
                }
              }}
            >
              {products.map((p, i) => (
                <li
                  key={p.id}
                  style={{ width: cardW || undefined, flex: cardW ? `0 0 ${cardW}px` : '0 0 100%' }}
                >
                  <div role="group" aria-roledescription="slide" aria-label={`${i + 1} de ${products.length}`} className="h-full">
                    <ProductSlide slide={p} />
                  </div>
                </li>
              ))}
            </motion.ul>
          </motion.div>
        </div>

        {/* indicadores + setas (mobile) */}
        <div className="mt-4 flex items-center justify-center gap-3">
          <button type="button" onClick={() => go(-1, true)} aria-label="Produto anterior" className={`${arrow} md:hidden`}>
            <ArrowLeft className="size-5" />
          </button>
          <div className="flex items-center" role="tablist" aria-label="Posição da vitrine">
            {Array.from({ length: positions }).map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Ir para a posição ${i + 1}`}
                onClick={() => goToDot(i)}
                className="grid h-11 min-w-6 place-items-center px-1"
              >
                <span className={`block h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-7 bg-accent' : 'w-2.5 bg-white/40'}`} />
              </button>
            ))}
          </div>
          <button type="button" onClick={() => go(1, true)} aria-label="Próximo produto" className={`${arrow} md:hidden`}>
            <ArrowRight className="size-5" />
          </button>
        </div>

        <p className="flex items-center justify-center gap-2 text-sm font-semibold text-white/75">
          <span className="animate-nudge" aria-hidden="true">
            <ChevronsRight className="size-5 text-accent" />
          </span>
          <span className="md:hidden">Deslize para conhecer mais produtos</span>
          <span className="hidden md:inline">Confira mais produtos — use as setas ou arraste</span>
        </p>
      </div>
    </section>
  )
}
