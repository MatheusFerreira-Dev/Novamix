import { AnimatePresence, motion } from 'framer-motion'
import { CalendarCheck, CheckCircle2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { services } from '../data/services'
import { waLink } from '../lib/whatsapp'
import { Field, selectClass } from './Field'
import { Eyebrow, Reveal, WhatsAppIcon, WhatsAppNote } from './ui'

const times = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']
const serviceOptions = [...services.map((s) => s.title), 'Outro']

const empty = { nome: '', whatsapp: '', veiculo: '', servico: '', data: '', horario: '' }
type Form = typeof empty

const todayISO = () => {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}

const maskPhone = (raw: string) => {
  const d = raw.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

const formatDate = (iso: string) => iso.split('-').reverse().join('/')

const buildMessage = (f: Form) =>
  `Olá! Gostaria de agendar um horário.\n\nNome: ${f.nome}\nWhatsApp: ${f.whatsapp}\nVeículo: ${f.veiculo}\nServiço: ${f.servico}\nData: ${formatDate(f.data)}\nHorário: ${f.horario}`

export default function BookingSection() {
  const [f, setF] = useState<Form>(empty)
  const [errors, setErrors] = useState<Partial<Form>>({})
  const [sent, setSent] = useState<string | null>(null)
  const [attempt, setAttempt] = useState(0)
  const summaryRef = useRef<HTMLDivElement>(null)

  // após uma tentativa inválida, leva o foco ao resumo de erros (links para cada campo)
  useEffect(() => {
    if (attempt) summaryRef.current?.focus()
  }, [attempt])

  const fieldIds: Record<keyof Form, string> = {
    nome: 'bk-nome',
    whatsapp: 'bk-wpp',
    veiculo: 'bk-veiculo',
    servico: 'bk-servico',
    data: 'bk-data',
    horario: 'bk-hora',
  }

  const set = (k: keyof Form) => (e: { target: { value: string } }) =>
    setF((s) => ({ ...s, [k]: k === 'whatsapp' ? maskPhone(e.target.value) : e.target.value }))

  const validate = () => {
    const e: Partial<Form> = {}
    if (f.nome.trim().length < 2) e.nome = 'Informe seu nome.'
    if (f.whatsapp.replace(/\D/g, '').length < 10) e.whatsapp = 'Informe um WhatsApp com DDD.'
    if (f.veiculo.trim().length < 2) e.veiculo = 'Informe marca e modelo do veículo.'
    if (!f.servico) e.servico = 'Escolha um serviço.'
    if (!f.data) e.data = 'Escolha uma data.'
    else if (f.data < todayISO()) e.data = 'Escolha uma data a partir de hoje.'
    if (!f.horario) e.horario = 'Escolha um horário.'
    return e
  }

  const submit = (ev: FormEvent) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) {
      setAttempt((n) => n + 1)
      return
    }
    const link = waLink(buildMessage(f))
    setSent(link)
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="agendar" className="relative overflow-hidden bg-ink py-14 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute -right-40 top-0 size-[40rem] rounded-full bg-accent/10 blur-[120px]" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <Eyebrow>Agende sua troca de óleo em Jarinu</Eyebrow>
          <h2 className="display text-[clamp(2.1rem,4.8vw,3.75rem)]">
            Seu horário.
            <br />
            <span className="text-accent">Sem espera.</span>
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/65">Escolha o melhor horário e venha cuidar do seu carro.</p>
          <ol className="mt-10 space-y-4 text-sm text-white/55">
            {['Preencha seus dados', 'Enviamos o pedido pelo WhatsApp', 'Confirmamos o horário com você'].map((t, i) => (
              <li key={t} className="flex items-center gap-4">
                <span className="grid size-8 place-items-center rounded-full border border-white/20 font-display text-xs font-bold text-accent">{i + 1}</span>
                {t}
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-white/10 bg-graphite p-6 sm:p-10">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div key="ok" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="py-6 text-center" role="status">
                  <CheckCircle2 className="mx-auto size-14 text-accent" strokeWidth={1.5} aria-hidden="true" />
                  <h3 className="display mt-6 text-3xl">Quase lá!</h3>
                  <p className="mx-auto mt-4 max-w-sm text-white/65">
                    Abrimos o WhatsApp com seu pedido. Basta enviar a mensagem para confirmarmos seu horário.
                  </p>
                  <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <a href={sent} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-7 text-sm font-bold uppercase tracking-wider text-ink hover:bg-accent-hot">
                      <WhatsAppIcon className="size-5" /> Abrir WhatsApp
                    </a>
                    <button type="button" onClick={() => { setSent(null); setF(empty) }} className="min-h-12 rounded-full border border-white/25 px-7 text-sm font-bold uppercase tracking-wider hover:bg-white/10">
                      Novo agendamento
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-5 sm:grid-cols-2">
                  {Object.keys(errors).length > 0 && (
                    <div ref={summaryRef} tabIndex={-1} role="alert" className="sm:col-span-2 rounded-xl border border-red-400/60 bg-red-400/10 p-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-red-400">
                      <p className="font-bold">Revise os campos abaixo:</p>
                      <ul className="mt-2 list-inside list-disc space-y-1 text-red-300">
                        {(Object.keys(errors) as (keyof Form)[]).map((k) => (
                          <li key={k}><a href={`#${fieldIds[k]}`} onClick={(ev) => { ev.preventDefault(); document.getElementById(fieldIds[k])?.focus() }} className="underline underline-offset-2">{errors[k]}</a></li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="sm:col-span-1">
                    <Field id="bk-nome" label="Nome" placeholder="Seu nome" autoComplete="name" value={f.nome} onChange={set('nome')} error={errors.nome} />
                  </div>
                  <Field id="bk-wpp" label="WhatsApp" placeholder="(11) 90000-0000" inputMode="tel" autoComplete="tel" value={f.whatsapp} onChange={set('whatsapp')} error={errors.whatsapp} />
                  <Field id="bk-veiculo" label="Veículo" placeholder="Ex.: Fiat Argo 2020" value={f.veiculo} onChange={set('veiculo')} error={errors.veiculo} autoComplete="off" />
                  <Field id="bk-servico" label="Serviço" error={errors.servico}>
                    <select id="bk-servico" aria-invalid={!!errors.servico} value={f.servico} onChange={set('servico')} className={selectClass(errors.servico)}>
                      <option value="" className="text-ink">Selecione</option>
                      {serviceOptions.map((s) => <option key={s} value={s} className="text-ink">{s}</option>)}
                    </select>
                  </Field>
                  <Field id="bk-data" label="Data" type="date" min={todayISO()} value={f.data} onChange={set('data')} error={errors.data} />
                  <Field id="bk-hora" label="Horário" error={errors.horario}>
                    <select id="bk-hora" aria-invalid={!!errors.horario} value={f.horario} onChange={set('horario')} className={selectClass(errors.horario)}>
                      <option value="" className="text-ink">Selecione</option>
                      {times.map((t) => <option key={t} value={t} className="text-ink">{t}</option>)}
                    </select>
                  </Field>
                  <button type="submit" className="sm:col-span-2 mt-2 inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-accent px-8 text-sm font-bold uppercase tracking-wider text-ink transition hover:bg-accent-hot hover:shadow-[0_0_32px_-6px_var(--color-accent)]">
                    <CalendarCheck className="size-5" aria-hidden="true" /> Agendar horário
                  </button>
                  <WhatsAppNote className="sm:col-span-2 justify-center text-center" />
                  <p className="sm:col-span-2 text-center text-xs text-white/60">O horário é confirmado pela nossa equipe.</p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

