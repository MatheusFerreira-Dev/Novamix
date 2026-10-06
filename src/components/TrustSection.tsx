import { Gauge, HeartHandshake, ShieldCheck, Zap } from 'lucide-react'
import { business } from '../config/business'
import { Reveal } from './ui'

const items = [
  { icon: HeartHandshake, title: 'Atendimento especializado', text: 'Equipe pronta para orientar você.' },
  { icon: ShieldCheck, title: 'Produtos de qualidade', text: 'Marcas selecionadas para o seu motor.' },
  { icon: Zap, title: 'Serviço rápido', text: 'Agende e evite a espera.' },
  { icon: Gauge, title: 'Cuidado com seu veículo', text: 'Atenção a cada detalhe.' },
]

export default function TrustSection() {
  return (
    <section id="confianca" className="bg-accent text-ink">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12">
        <Reveal className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <h2 className="display text-xl sm:text-2xl">Por que escolher a gente?</h2>
          <p className="text-sm font-semibold text-ink/80">
            <span className="font-display text-lg font-extrabold text-ink">{business.googleRating.score}</span> no Google ·{' '}
            {business.googleRating.count} avaliações
          </p>
        </Reveal>

        <ul className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, text }, i) => (
            <li key={title}>
              <Reveal delay={i * 0.08}>
                <div className="flex items-center gap-3">
                  <span className="font-display text-sm font-extrabold text-ink/70">0{i + 1}</span>
                  <span className="h-px flex-1 bg-ink/30" />
                  <Icon className="size-6 text-ink" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-display text-base font-bold leading-snug sm:text-lg">{title}</h3>
                <p className="mt-1.5 text-sm font-medium text-ink/80">{text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
