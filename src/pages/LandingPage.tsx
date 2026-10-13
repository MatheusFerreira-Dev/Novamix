import { ChevronDown, Navigation } from 'lucide-react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import WhatsAppButton from '../components/WhatsAppButton'
import { ButtonAction, Eyebrow, WhatsAppIcon, WhatsAppNote } from '../components/ui'
import { business } from '../config/business'
import { processSteps } from '../data/process'
import type { LandingPageData } from '../data/pages'
import { landingPages } from '../data/pages'
import { useDirections } from '../lib/directionsContext'
import { waLink } from '../lib/whatsapp'

/** Página local estática (SEO local). Reaproveita cabeçalho, rodapé e identidade visual da home. */
export default function LandingPage({ page }: { page: LandingPageData }) {
  const { openDirections } = useDirections()
  const others = landingPages.filter((p) => p.path !== page.path)

  return (
    <>
      <Header homePrefix="/" />
      <main id="conteudo" className="bg-ink pt-16">
        <section className="border-b border-white/10 bg-graphite">
          <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
            <nav aria-label="Trilha de navegação" className="mb-6 text-xs text-white/60">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <a href="/" className="hover:text-accent">
                    Início
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-white/85">
                  {page.breadcrumb}
                </li>
              </ol>
            </nav>
            <Eyebrow>
              {business.name} · {business.city} - {business.state}
            </Eyebrow>
            <h1 className="display text-[clamp(1.9rem,4.5vw,3.4rem)]">{page.h1}</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">{page.lead}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={waLink(page.waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-7 text-sm font-bold uppercase tracking-wider text-ink transition hover:bg-accent-hot"
              >
                <WhatsAppIcon className="size-5" /> Agendar pelo WhatsApp
              </a>
              <ButtonAction onClick={openDirections} variant="ghost">
                <Navigation className="size-4" aria-hidden="true" /> Como chegar
              </ButtonAction>
            </div>
            <WhatsAppNote className="mt-4" />
          </div>
        </section>

        <div className="mx-auto max-w-4xl space-y-10 px-5 py-10 sm:px-8 sm:py-14">
          {page.blocks.map((b) => (
            <section key={b.heading}>
              <h2 className="font-display text-xl font-bold sm:text-2xl">{b.heading}</h2>
              {b.paragraphs?.map((p) => (
                <p key={p} className="mt-3 text-base leading-relaxed text-white/80">
                  {p}
                </p>
              ))}
              {b.list && (
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {b.list.map((i) => (
                    <li key={i} className="flex gap-3 rounded-xl border border-white/10 bg-steel/60 px-4 py-3 text-sm sm:text-base">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {i}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {page.showProcess && (
            <section>
              <h2 className="font-display text-xl font-bold sm:text-2xl">Como funciona a troca de óleo</h2>
              <ol className="mt-4 grid gap-3 sm:grid-cols-2">
                {processSteps.map((s, i) => (
                  <li key={s.title} className="rounded-2xl border border-white/10 bg-steel/60 p-4">
                    <span className="font-display text-sm font-bold text-accent">0{i + 1}</span>
                    <h3 className="mt-1 font-display text-base font-bold">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-white/75">{s.text}</p>
                  </li>
                ))}
              </ol>
            </section>
          )}

          <section>
            <h2 className="font-display text-xl font-bold sm:text-2xl">Perguntas frequentes</h2>
            <div className="mt-4 divide-y divide-white/10 border-y border-white/10">
              {page.faq.map((f) => (
                <details key={f.question} className="group">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 [&::-webkit-details-marker]:hidden">
                    <h3 className="font-display text-base font-bold leading-snug sm:text-lg">{f.question}</h3>
                    <ChevronDown className="size-5 shrink-0 text-accent transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <p className="pb-4 pr-8 text-sm leading-relaxed text-white/75 sm:text-base">{f.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section aria-labelledby="mais-paginas">
            <h2 id="mais-paginas" className="font-display text-xl font-bold sm:text-2xl">
              Veja também
            </h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {others.map((p) => (
                <li key={p.path}>
                  <a
                    href={p.path}
                    className="flex min-h-12 items-center rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold transition hover:border-accent hover:text-accent sm:text-base"
                  >
                    {p.breadcrumb}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/"
                  className="flex min-h-12 items-center rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold transition hover:border-accent hover:text-accent sm:text-base"
                >
                  Página inicial da Novamix Center
                </a>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer homePrefix="/" />
      <WhatsAppButton />
    </>
  )
}
