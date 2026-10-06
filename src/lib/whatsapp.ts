import { business } from '../config/business'

export const waLink = (message: string) =>
  `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`

// Mensagens prontas por contexto. Os trechos entre [colchetes] são para o cliente completar no WhatsApp.
export const messages = {
  general: 'Olá! Gostaria de falar com a loja sobre meu veículo.',
  schedule: 'Olá! Gostaria de agendar uma troca de óleo para o meu veículo.',
  products: 'Olá! Gostaria de saber mais sobre os produtos disponíveis.',
  product: (name: string) => `Olá! Gostaria de saber mais sobre o produto ${name}.`,
  service: (title: string) => `Olá! Gostaria de saber mais sobre o serviço: ${title}.`,
  oilHelp: 'Olá! Gostaria de tirar uma dúvida sobre qual óleo é adequado para o meu veículo.',
  hours: 'Olá! Gostaria de confirmar o horário de funcionamento da loja antes de ir.',
}

export const waGreeting = waLink(messages.general)
export const waSchedule = waLink(messages.schedule)
