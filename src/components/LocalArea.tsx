import { ArrowRight, MapPin } from 'lucide-react'
import { business } from '../config/business'
import { processSteps } from '../data/process'
import { Eyebrow, Reveal } from './ui'

/** "Como funciona a troca de óleo" + cidades atendidas (links para as páginas locais). */
export default function LocalArea() {
  return (
    <section id="como-funciona" className="bg-ink py-12 sm:py-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Eyebrow>Passo a passo</Eyebrow>
          <h2 className="display text-[clamp(1.6rem,3.2vw,2.5rem)]">Como funciona a troca de óleo</h2>
          <ol className="mt-6 space-y-4">
            {processSteps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-accent/60 font-display text-sm font-bold text-accent">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-base font-bold">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/75">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={0.05}>
          <Eyebrow>Cidades atendidas</Eyebrow>
          <h2 className="display text-[clamp(1.6rem,3.2vw,2.5rem)]">Troca de óleo em Jarinu e região</h2>
          <p className="mt-3 max-w-lg text-base leading-relaxed text-white/75">
            A {business.name} fica no Centro de {business.city} - {business.state} e recebe clientes de cidades vizinhas. Veja a página da sua cidade
            para saber como agendar.
          </p>
          <ul className="mt-6 grid gap-2">
            {business.serviceAreas.map((c) => (
              <li key={c.path}>
                <a
                  href={c.path}
                  className="group flex min-h-14 items-center justify-between gap-3 rounded-2xl border border-white/10 bg-steel/60 px-5 py-3 transition hover:border-accent"
                >
                  <span className="flex items-center gap-3 font-display text-base font-bold">
                    <MapPin className="size-5 text-accent" aria-hidden="true" />
                    Troca de óleo em {c.name}
                  </span>
                  <ArrowRight className="size-4 text-white/60 transition group-hover:translate-x-1 group-hover:text-accent" aria-hidden="true" />
                </a>
              </li>
            ))}
            <li>
              <a
                href="/acessorios-automotivos/"
                className="group flex min-h-14 items-center justify-between gap-3 rounded-2xl border border-white/10 bg-steel/60 px-5 py-3 transition hover:border-accent"
              >
                <span className="font-display text-base font-bold">Acessórios e produtos automotivos</span>
                <ArrowRight className="size-4 text-white/60 transition group-hover:translate-x-1 group-hover:text-accent" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
