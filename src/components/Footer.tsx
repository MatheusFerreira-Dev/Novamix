import { business } from '../config/business'
import { waGreeting } from '../lib/whatsapp'
import { InstagramIcon, WhatsAppIcon } from './ui'

const links = [
  { label: 'Início', href: '#inicio' },
  { label: 'Produtos', href: '#produtos' },
  { label: 'Troca de óleo', href: '#oleo-ideal' },
  { label: 'Agendamento', href: '#agendar' },
  { label: 'Sobre nós', href: '#sobre' },
]

export default function Footer() {
  return (
    <footer className="border-t-2 border-accent bg-ink">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <img src="/logo-830.webp" alt={`${business.name} ${business.tagline}`} width={830} height={210} className="h-14 w-auto" loading="lazy" decoding="async" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
            Troca de óleo, filtros, lubrificantes e acessórios automotivos para manter seu veículo sempre em boas condições.
          </p>
        </div>

        <nav aria-label="Rodapé">
          <h2 className="mb-5 text-xs font-bold uppercase tracking-widest text-white/60">Navegação</h2>
          <ul className="space-y-3 text-sm">
            {links.map((l) => (
              <li key={l.href}><a href={l.href} className="text-white/75 hover:text-accent">{l.label}</a></li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-5 text-xs font-bold uppercase tracking-widest text-white/60">Contato</h2>
          <ul className="space-y-3 text-sm text-white/75">
            <li>
              <address className="not-italic leading-relaxed">
                {business.address.street}
                <br />
                {business.address.neighborhood}, {business.city} - {business.state}
                <br />
                CEP {business.address.cep}
              </address>
            </li>
            <li>
              <a href={`tel:+${business.whatsappNumber}`} className="hover:text-accent">
                {business.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={waGreeting} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-accent">
                <WhatsAppIcon className="size-4" /> WhatsApp
              </a>
            </li>
            <li>
              <a href={business.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-accent">
                <InstagramIcon className="size-4" /> {business.instagramHandle}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 pb-24 pt-6 text-center text-xs text-white/60 sm:pb-6">
        <p>© 2026 — Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}


