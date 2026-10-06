import { motion } from 'framer-motion'
import { waGreeting } from '../lib/whatsapp'
import { WhatsAppIcon } from './ui'

export default function WhatsAppButton() {
  return (
    <motion.a
      href={waGreeting}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco no WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: 'spring', stiffness: 220, damping: 18 }}
      className="group fixed bottom-5 right-5 z-40 sm:bottom-7 sm:right-7"
    >
      <span className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-ink opacity-0 shadow-lg transition group-hover:opacity-100 group-focus-visible:opacity-100 sm:block">
        Fale conosco
      </span>
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25d366]/30 [animation-duration:3s]" aria-hidden="true" />
      <span className="relative grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_8px_30px_-6px_rgba(37,211,102,0.6)] transition group-hover:scale-105">
        <WhatsAppIcon className="size-7" />
      </span>
    </motion.a>
  )
}
