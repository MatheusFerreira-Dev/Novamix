import { motion } from 'framer-motion'
import { ArrowDown, ChevronDown, MapPin } from 'lucide-react'
import { business } from '../config/business'
import { useDirections } from '../lib/directionsContext'
import { waSchedule } from '../lib/whatsapp'
import HeroVideo from './HeroVideo'
import { Button, ButtonAction, WhatsAppIcon, WhatsAppNote } from './ui'

/** Só o anel de bolinhas girando (sem os outros anéis, marcas nem gota). */
function HeroRings() {
  return (
    <svg viewBox="0 0 600 600" className="h-full w-full" aria-hidden="true">
      <circle cx="300" cy="300" r="270" fill="none" stroke="#f58a1f" strokeOpacity="0.7" strokeWidth="2" strokeDasharray="2 14" className="ring-spin" />
    </svg>
  )
}
export default function Hero() {
  const { openDirections } = useDirections()

  return (
    <section id="inicio" className="relative isolate flex min-h-[34rem] items-center overflow-hidden bg-ink sm:min-h-[36rem] lg:min-h-[min(82svh,40rem)]">
      {/* bolinhas girando: só do lado esquerdo, terminando exatamente onde o vídeo começa (nunca por trás/por cima dele) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 right-[56%] -z-30 hidden overflow-hidden lg:block" aria-hidden="true">
        <div className="absolute right-0 top-1/2 aspect-square h-[min(92%,640px)] translate-x-1/2 -translate-y-1/2">
          <HeroRings />
        </div>
      </div>
      {/* fachada: trecho 33–36s do vídeo, em velocidade normal, uma única vez (vídeo vertical: ocupa o lado direito no desktop) */}
      <HeroVideo />
      {/* overlay: leve no desktop (o texto fica sobre o fundo escuro); no mobile escurece só o necessário para leitura */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,9,10,0.9)_0%,rgba(8,9,10,0.35)_50%,transparent_100%)] max-lg:bg-[linear-gradient(180deg,rgba(8,9,10,0.25)_0%,rgba(8,9,10,0.55)_45%,rgba(8,9,10,0.92)_100%)]" />

      <div className="mx-auto w-full max-w-7xl px-5 pb-14 pt-24 sm:px-8 sm:pb-16 lg:[&>*]:max-w-[46%]">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] backdrop-blur"
        >
          <MapPin className="size-4 text-accent" aria-hidden="true" />
          {business.city} - {business.state}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="display max-w-4xl text-[clamp(2.3rem,min(7vw,10.5vh),4.75rem)]"
        >
          Seu carro
          <br />
          merece o <span className="text-accent">melhor.</span>
          <span className="mt-4 block text-lg font-bold normal-case leading-snug tracking-normal sm:text-xl">
            Troca de óleo em Jarinu e cuidados para o seu carro
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-5 max-w-xl"
        >
          <p className="text-base leading-relaxed text-white/80">
            Qualidade, cuidado e os produtos certos para manter seu veículo em dia.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-7"
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href={waSchedule} external>
              <WhatsAppIcon className="size-5" /> Agendar pelo WhatsApp
            </Button>
            <ButtonAction onClick={openDirections} variant="ghost">
              <MapPin className="size-4" aria-hidden="true" /> Como chegar
            </ButtonAction>
          </div>
          <WhatsAppNote className="mt-4" />
          <a href="#produtos" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold uppercase tracking-wider text-white/80 underline-offset-8 hover:text-accent hover:underline">
            Conhecer produtos <ArrowDown className="size-4" aria-hidden="true" />
          </a>
        </motion.div>
      </div>

      <a
        href="#produtos"
        aria-label="Rolar para baixo"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 sm:flex"
      >
        Role
        <span className="animate-bob">
          <ChevronDown className="size-5" aria-hidden="true" />
        </span>
      </a>
    </section>
  )
}
