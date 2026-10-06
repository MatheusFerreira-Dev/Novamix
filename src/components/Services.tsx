import { ArrowUpRight } from 'lucide-react'
import { services } from '../data/services'
import { messages, waLink } from '../lib/whatsapp'
import { Eyebrow, Reveal } from './ui'

export default function Services() {
  return (
    <section id="servicos" className="bg-white py-14 text-ink sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <Reveal className="lg:sticky lg:top-24 lg:self-start">
          <Eyebrow light>Serviços</Eyebrow>
          <h2 className="display text-[clamp(1.9rem,3.8vw,3rem)]">
            Mais do que uma troca de óleo<span className="text-accent">.</span>
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-neutral-600">
            Cuidados essenciais para manter seu veículo funcionando com segurança, desempenho e eficiência.
          </p>
        </Reveal>

        <ul className="border-t border-neutral-200">
          {services.map(({ id, title, text, icon: Icon }, i) => (
            <li key={id}>
              <Reveal delay={0.04 * i}>
                <a
                  href={waLink(messages.service(title))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-neutral-200 py-5 transition-colors hover:bg-neutral-50 sm:gap-6 sm:py-6"
                >
                  <span className="font-display text-sm font-bold text-accent-deep transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="transition-transform duration-300 group-hover:translate-x-1">
                    <h3 className="font-display text-lg font-bold sm:text-xl">{title}</h3>
                    <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-neutral-600">{text}</p>
                  </div>
                  <span className="grid size-12 place-items-center rounded-full border border-neutral-200 transition-colors border-accent/40 group-hover:border-accent group-hover:bg-accent">
                    <Icon className="size-5 group-hover:hidden" strokeWidth={1.5} aria-hidden="true" />
                    <ArrowUpRight className="hidden size-5 text-ink group-hover:block" aria-hidden="true" />
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

