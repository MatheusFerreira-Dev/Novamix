import { processSteps } from '../data/process'
import { Eyebrow, Reveal } from './ui'

/** "Como funciona a troca de óleo". */
export default function LocalArea() {
  return (
    <section id="como-funciona" className="bg-ink py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal>
          <Eyebrow>Passo a passo</Eyebrow>
          <h2 className="display text-[clamp(1.6rem,3.2vw,2.5rem)]">Como funciona a troca de óleo</h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2">
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
      </div>
    </section>
  )
}
