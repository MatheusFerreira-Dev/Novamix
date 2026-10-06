import aboutPhoto from '../assets/sobre-mecanico.jpg'
import { business } from '../config/business'
import { useDirections } from '../lib/directionsContext'
import { Eyebrow, Reveal } from './ui'

export default function About() {
  const { openDirections } = useDirections()

  return (
    <section id="sobre" className="bg-white py-14 text-ink sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Eyebrow light>Sobre nós</Eyebrow>
          <h2 className="display text-[clamp(1.9rem,3.8vw,3rem)]">Seu carro em boas mãos.</h2>
          {/* TODO: substituir por texto institucional real fornecido pelo cliente */}
          <p className="mt-4 max-w-lg text-base leading-relaxed text-neutral-700">
            A {business.name} é uma loja de troca de óleo no Centro de {business.city} - {business.state}. Trabalhamos com troca de óleo, filtros,
            lubrificantes, limpeza a seco do motor, higienização do ar-condicionado, produtos de limpeza e acessórios automotivos, para você
            manter seu veículo sempre em boas condições.
          </p>
          <p className="mt-3 max-w-lg text-base leading-relaxed text-neutral-700">
            Estamos perto de Atibaia, Campo Limpo Paulista e Jundiaí.
          </p>
          <address className="mt-6 border-l-4 border-accent pl-4 not-italic">
            <p className="font-display text-lg font-bold uppercase tracking-wider">
              {business.city} • {business.state}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-neutral-700">
              {business.address.street} — {business.address.neighborhood}
              <br />
              CEP {business.address.cep} ·{' '}
              <a href={`tel:+${business.whatsappNumber}`} className="font-semibold text-accent-deep underline-offset-4 hover:underline">
                {business.phoneDisplay}
              </a>
            </p>
            <button
              type="button"
              onClick={openDirections}
              className="mt-2 inline-flex min-h-11 items-center text-sm font-bold uppercase tracking-wider text-accent-deep underline-offset-4 hover:underline"
            >
              Como chegar
            </button>
          </address>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative aspect-[5/4] overflow-hidden rounded-3xl bg-ink">
            <img
              src={aboutPhoto}
              alt="Mecânico da Novamix Center fazendo a troca de óleo de um carro no elevador da loja"
              width={1000}
              height={1000}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-[25%_60%]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
