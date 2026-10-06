import { ArrowRight } from 'lucide-react'
import type { ProductSlideData } from '../data/products'
import { waLink } from '../lib/whatsapp'
import ProductVisual from './ProductVisual'

/** Card compacto da vitrine de produtos */
export default function ProductSlide({ slide }: { slide: ProductSlideData }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-steel p-4 transition-colors duration-300 hover:border-accent/60 sm:p-5">
      <div className="relative mx-auto flex h-36 w-full items-center justify-center rounded-xl bg-[radial-gradient(circle_at_50%_60%,rgba(245,138,31,0.3),transparent_72%)] sm:h-40">
        <ProductVisual kind={slide.kind} imageName={slide.imageName} alt={slide.alt} />
      </div>

      <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-accent">{slide.kicker}</p>
      <h3 className="mt-1.5 font-display text-lg font-bold leading-snug">{slide.title.join(' ')}</h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/70">{slide.text}</p>
      {slide.brandLine && <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-white/60">{slide.brandLine}</p>}

      <a
        href={waLink(slide.waMessage)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${slide.cta} — ${slide.name} (abre o WhatsApp)`}
        className="group mt-auto inline-flex min-h-11 items-center gap-2 pt-4 text-sm font-bold uppercase tracking-wider text-white transition hover:text-accent"
      >
        {slide.cta}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </a>
    </article>
  )
}
