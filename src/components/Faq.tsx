import { ChevronDown } from 'lucide-react'
import { faq } from '../data/faq'
import { messages, waLink } from '../lib/whatsapp'
import { Eyebrow, Reveal, WhatsAppIcon, WhatsAppNote } from './ui'

export default function Faq() {
  return (
    <section id="duvidas" className="bg-graphite py-12 sm:py-16">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <Reveal>
          <Eyebrow>Dúvidas frequentes</Eyebrow>
          <h2 className="display text-[clamp(1.6rem,3.2vw,2.5rem)]">Perguntas sobre troca de óleo</h2>
          <p className="mt-3 max-w-md text-base text-white/75">
            Respostas rápidas para as dúvidas mais comuns. Não achou o que procurava? Fale com a nossa equipe.
          </p>
          <a
            href={waLink(messages.oilHelp)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-bold uppercase tracking-wider text-ink transition hover:bg-accent-hot"
          >
            <WhatsAppIcon className="size-5" /> Tirar dúvidas
          </a>
          <WhatsAppNote className="mt-3" />
        </Reveal>

        <Reveal delay={0.05}>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {faq.map((item) => (
              <details key={item.question} className="group">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 [&::-webkit-details-marker]:hidden">
                  <h3 className="font-display text-base font-bold leading-snug sm:text-lg">{item.question}</h3>
                  <ChevronDown className="size-5 shrink-0 text-accent transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="pb-4 pr-8 text-sm leading-relaxed text-white/75 sm:text-base">{item.answer}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
