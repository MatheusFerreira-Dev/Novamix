import { Clock, MapPin, Navigation, Phone } from 'lucide-react'
import { business, mapsEmbedUrl } from '../config/business'
import { useDirections } from '../lib/directionsContext'
import { messages, waGreeting, waLink } from '../lib/whatsapp'
import { ButtonAction, Eyebrow, Reveal, WhatsAppIcon, WhatsAppNote } from './ui'

export default function Location() {
  const { openDirections } = useDirections()

  const rows = [
    {
      icon: MapPin,
      label: 'Endereço',
      value: `${business.address.street}\n${business.address.neighborhood}, ${business.address.city}\nCEP ${business.address.cep}`,
    },
    {
      icon: Clock,
      label: 'Horário de funcionamento',
      value: business.hours.length
        ? business.hours.map((h) => `${h.label}: ${h.value}`).join('\n')
        : 'Consulte nossos horários pelo WhatsApp.',
      href: business.hours.length ? undefined : waLink(messages.hours),
    },
    { icon: Phone, label: 'Telefone', value: business.phoneDisplay, href: `tel:+${business.whatsappNumber}` },
    { icon: WhatsAppIcon, label: 'WhatsApp', value: business.phoneDisplay, href: waGreeting },
  ]

  return (
    <section id="contato" className="bg-graphite py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <Eyebrow>Onde estamos</Eyebrow>
          <h2 className="display text-[clamp(2rem,4.2vw,3.25rem)]">Estamos em Jarinu.</h2>
          <p className="mt-5 max-w-xl text-base text-white/75">Uma loja de verdade, no Centro da cidade. Venha conhecer e cuidar do seu carro com a gente.</p>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <dl className="divide-y divide-white/10 border-y border-white/10">
              {rows.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex gap-5 py-5">
                  <Icon className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-widest text-white/60">{label}</dt>
                    <dd className="mt-1.5 whitespace-pre-line text-base text-white/90">
                      {href ? (
                        <a href={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="underline-offset-4 hover:text-accent hover:underline">
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonAction onClick={openDirections} className="w-full sm:w-auto">
                <Navigation className="size-4" aria-hidden="true" /> Como chegar
              </ButtonAction>
              <a
                href={waGreeting}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/25 px-7 text-sm font-bold uppercase tracking-wider transition hover:border-white hover:bg-white/10 sm:w-auto"
              >
                <WhatsAppIcon className="size-5 text-[#25d366]" /> Falar no WhatsApp
              </a>
            </div>
            <WhatsAppNote className="mt-4" />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-80 overflow-hidden rounded-3xl border border-white/10 sm:h-[26rem] lg:h-full lg:min-h-[26rem]">
              <iframe
                title={`Mapa — ${business.name}`}
                src={mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0 grayscale invert-[0.92] contrast-90 hue-rotate-180"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
