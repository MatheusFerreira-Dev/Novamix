import { useEffect, useRef, useState } from 'react'
import { splashDone } from '../lib/splash'

// Vídeo da fachada em public/: clipe de 3s com o trecho 33s–36s do vídeo original (gerado uma vez, H.264 de alta qualidade),
// reproduzido em velocidade normal (1x), uma única vez. O arquivo completo fica em _originais/.
const SRC = '/video-fachada.mp4'
const POSTER = '/video-fachada-poster.jpg'
// celular: só o último frame (imagem estática), sem baixar o vídeo
const LAST_FRAME = '/video-fachada-ultimo-frame.jpg'
const MOBILE_QUERY = '(max-width: 767px)'
const START = 0
const END = 3
const RATE = 1

/**
 * Toca o clipe (trecho 33–36s) em velocidade normal (1x), automaticamente, UMA vez, e para no último frame.
 * O poster (1º frame) aparece imediatamente e o vídeo só começa a baixar depois que a página carregou.
 * Começa depois da abertura com a logo. Com "reduzir movimento" ou economia de dados,
 * mostra apenas o último frame, parado.
 */
function HeroMotion() {
  const ref = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(true) // o poster já aparece no mesmo instante

  useEffect(() => {
    const v = ref.current
    if (!v) return

    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches || !!conn?.saveData

    let cancelled = false
    let raf = 0
    let finished = false
    let visible = true
    let allowed = false // liberado quando a abertura com a logo termina

    v.defaultPlaybackRate = RATE
    v.playbackRate = RATE

    const show = () => !cancelled && setReady(true)
    const seek = (t: number) => {
      try {
        v.currentTime = t
      } catch {
        /* ainda sem metadados */
      }
    }

    const onMeta = () => seek(still ? END - 0.05 : START)
    if (v.readyState >= 1) onMeta()
    else v.addEventListener('loadedmetadata', onMeta, { once: true })
    v.addEventListener('loadeddata', show, { once: true })
    v.addEventListener('seeked', show, { once: true })
    const safety = window.setTimeout(show, 2500) // nunca deixa o Hero sem imagem

    // o vídeo só começa a baixar depois que a página terminou de carregar (não disputa banda com o conteúdo inicial)
    const attach = () => {
      if (!v.getAttribute('src')) {
        v.src = SRC
        v.load()
      }
    }
    if (document.readyState === 'complete') attach()
    else window.addEventListener('load', attach, { once: true })

    const tryPlay = () => {
      if (still || finished || !allowed || !visible || document.hidden || v.readyState < 2) return
      if (v.paused) {
        v.playbackRate = RATE
        v.play().catch(() => {})
      }
    }

    // fim: fica parado no último frame, sem repetir (e encerra o laço de animação)
    const finish = () => {
      finished = true
      if (!v.paused) v.pause()
      cancelAnimationFrame(raf)
    }
    v.addEventListener('ended', finish)

    const loop = () => {
      raf = requestAnimationFrame(loop)
      if (finished) return
      if (!still && (v.ended || v.currentTime >= END - 0.04)) {
        finish()
        return
      }
      tryPlay()
    }
    raf = requestAnimationFrame(loop)

    splashDone.then(() => {
      allowed = true
      tryPlay()
    })

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (!visible) v.pause()
      else tryPlay()
    })
    io.observe(v)

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      clearTimeout(safety)
      window.removeEventListener('load', attach)
      io.disconnect()
      v.pause()
    }
  }, [])

  return (
    <div
      className={`absolute inset-y-0 right-0 -z-20 w-full bg-ink transition-opacity duration-1000 lg:w-[56%] lg:[mask-image:linear-gradient(90deg,transparent,#000_22%)] ${ready ? 'opacity-100' : 'opacity-0'}`}
      role="img"
      aria-label="Fachada da loja Novamix Center em Jarinu"
    >
      <video
        ref={ref}
        muted
        poster={POSTER}
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
        className="h-full w-full object-cover object-[50%_40%] [filter:contrast(1.06)_saturate(1.08)]"
      />
    </div>
  )
}

/** Celular: apenas o último frame do vídeo, como imagem. Nada de vídeo, nada de decodificação, bem mais leve. */
function HeroStill() {
  return (
    <div
      className="absolute inset-y-0 right-0 -z-20 w-full bg-ink"
      role="img"
      aria-label="Fachada da loja Novamix Center em Jarinu"
    >
      <img
        src={LAST_FRAME}
        alt=""
        width={478}
        height={850}
        fetchPriority="high"
        decoding="async"
        className="h-full w-full object-cover object-[50%_40%]"
      />
    </div>
  )
}

export default function HeroVideo() {
  const [mobile] = useState(() => typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches)
  return mobile ? <HeroStill /> : <HeroMotion />
}
