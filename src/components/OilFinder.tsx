import { Check, ChevronDown, Droplets, Search } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { carBrands } from '../data/carBrands'
import { oilTypes } from '../data/oils'
import { messages, waLink } from '../lib/whatsapp'
import { Field, selectClass } from './Field'
import { Eyebrow, Reveal, WhatsAppIcon, WhatsAppNote } from './ui'

const empty = { marca: '', marcaOutra: '', modelo: '', ano: '', motor: '' }
const OTHER = '__outra'

export default function OilFinder() {
  const [v, setV] = useState(empty)
  const [errors, setErrors] = useState<Partial<typeof empty>>({})
  // no celular as características ficam recolhidas (no desktop aparecem sempre)
  const [openId, setOpenId] = useState<string | null>(null)

  const set = (k: keyof typeof empty) => (e: { target: { value: string } }) => setV((s) => ({ ...s, [k]: e.target.value }))

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const marca = v.marca === OTHER ? v.marcaOutra.trim() : v.marca
    const next: Partial<typeof empty> = {}
    if (!v.marca) next.marca = 'Escolha a marca.'
    else if (!marca) next.marcaOutra = 'Informe a marca.'
    if (!v.modelo.trim()) next.modelo = 'Informe o modelo.'
    if (!/^(19|20)\d{2}$/.test(v.ano.trim())) next.ano = 'Informe um ano válido (ex.: 2018).'
    if (!v.motor.trim()) next.motor = 'Informe o motor (ex.: 1.0, 1.6).'
    setErrors(next)
    if (Object.keys(next).length) return

    const msg = `Olá! Gostaria de saber qual óleo usar no meu veículo.\n\nMarca: ${marca}\nModelo: ${v.modelo}\nAno: ${v.ano}\nMotor: ${v.motor}`
    window.open(waLink(msg), '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="oleo-ideal" className="bg-graphite py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <Eyebrow>Troca de óleo em Jarinu - SP</Eyebrow>
          <h2 className="display text-[clamp(1.6rem,3.2vw,2.5rem)]">Quando devo trocar o óleo?</h2>
        </Reveal>

        {/* 1) Informe seu veículo — acima dos cards */}
        <Reveal delay={0.05} className="mt-5">
          <form onSubmit={submit} noValidate className="rounded-2xl border border-white/10 bg-steel/60 p-4 sm:p-5">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-white/75">Informe seu veículo</p>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-[1.2fr_1fr_0.6fr_0.7fr_auto] lg:items-start [&>:nth-child(-n+2)]:col-span-2 lg:[&>:nth-child(-n+2)]:col-span-1">
              <Field id="of-marca" label="Marca do veículo" error={errors.marca ?? errors.marcaOutra}>
                <div className="space-y-2">
                  <select id="of-marca" aria-invalid={!!errors.marca} value={v.marca} onChange={set('marca')} className={selectClass(errors.marca)}>
                    <option value="" className="text-ink">Escolha a marca</option>
                    {carBrands.map((b) => (
                      <option key={b.slug} value={b.name} className="text-ink">{b.name}</option>
                    ))}
                    <option value={OTHER} className="text-ink">Outra marca</option>
                  </select>
                  {v.marca === OTHER && (
                    <input
                      id="of-marca-outra"
                      aria-label="Qual marca?"
                      aria-invalid={!!errors.marcaOutra}
                      placeholder="Digite a marca"
                      value={v.marcaOutra}
                      onChange={set('marcaOutra')}
                      autoComplete="off"
                      className={selectClass(errors.marcaOutra)}
                    />
                  )}
                </div>
              </Field>
              <Field id="of-modelo" label="Modelo" placeholder="Ex.: Gol" value={v.modelo} onChange={set('modelo')} error={errors.modelo} autoComplete="off" />
              <Field id="of-ano" label="Ano" placeholder="2018" inputMode="numeric" maxLength={4} value={v.ano} onChange={set('ano')} error={errors.ano} />
              <Field id="of-motor" label="Motor" placeholder="Ex.: 1.6" value={v.motor} onChange={set('motor')} error={errors.motor} autoComplete="off" />
              <div className="col-span-2 lg:col-span-1 lg:pt-[1.65rem]">
                <button
                  type="submit"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-bold uppercase tracking-wider text-ink transition hover:bg-accent-hot hover:shadow-[0_0_32px_-6px_var(--color-accent)]"
                >
                  <Search className="size-4" aria-hidden="true" /> Encontrar produto
                </button>
              </div>
            </div>
            <WhatsAppNote className="mt-3" />
          </form>
        </Reveal>

        {/* 2) cards de óleo */}
        <Reveal delay={0.1} className="mt-5">
          <ul className="grid gap-3 md:grid-cols-3">
            {oilTypes.map((o) => (
              <li key={o.id} className="flex min-w-0">
                <article className="flex w-full flex-col rounded-2xl border border-neutral-200 bg-white p-4 text-ink shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-12px_rgba(245,138,31,0.35)]">
                  <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1.5">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent-deep">
                        <Droplets className="size-4" aria-hidden="true" />
                      </span>
                      <h3 className="min-w-0 break-words font-display text-sm font-extrabold uppercase leading-tight tracking-wide">{o.name}</h3>
                    </div>
                    <p className="shrink-0 font-display text-2xl font-extrabold leading-none tracking-tight">
                      {o.km}
                      <span className="ml-1 text-sm font-bold text-accent-deep">km</span>
                    </p>
                  </div>

                  <div className="mt-2.5 space-y-1.5 text-[13px] leading-snug text-neutral-700">
                    {o.intro.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpenId((cur) => (cur === o.id ? null : o.id))}
                    aria-expanded={openId === o.id}
                    aria-controls={`feat-${o.id}`}
                    className="mt-3 flex min-h-11 w-full items-center justify-between rounded-lg border border-neutral-200 px-3 text-xs font-bold uppercase tracking-widest text-neutral-700 md:hidden"
                  >
                    Características
                    <ChevronDown className={`size-4 transition-transform ${openId === o.id ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>
                  <p className="mt-3 hidden text-[10px] font-bold uppercase tracking-widest text-neutral-500 md:block">Características</p>
                  <ul id={`feat-${o.id}`} className={`mt-2 space-y-1 text-[13px] leading-snug text-neutral-800 md:mt-1.5 md:block ${openId === o.id ? 'block' : 'hidden'}`}>
                    {o.features.map((f) => (
                      <li key={f} className="flex gap-1.5">
                        <Check className="mt-0.5 size-3.5 shrink-0 text-accent-deep" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-auto pt-3 text-sm font-bold">
                    <span className="block border-t border-neutral-200 pt-2.5">
                      Troca de referência: <span className="text-accent-deep">{o.km} km</span>
                    </span>
                  </p>
                </article>
              </li>
            ))}
          </ul>

          <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <p className="max-w-3xl text-xs leading-relaxed text-white/65">
              <strong className="text-white/85">Importante:</strong> os intervalos apresentados são referências gerais. O período correto de troca deve seguir o manual do veículo, a especificação do fabricante e o lubrificante recomendado para o motor.
            </p>
            <div className="shrink-0">
              <a
                href={waLink(messages.oilHelp)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-accent px-6 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-accent hover:text-ink lg:w-auto"
              >
                <WhatsAppIcon className="size-5" /> Tirar dúvidas
              </a>
              <WhatsAppNote className="mt-2" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
