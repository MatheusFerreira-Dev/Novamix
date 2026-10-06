import { business } from '../config/business.ts'

export interface FaqItem {
  question: string
  answer: string
}

const address = `${business.address.street}, ${business.address.neighborhood}, ${business.address.city}`

// Respostas gerais e verificáveis. Sem preços, prazos ou horários que não estejam confirmados.
export const faq: FaqItem[] = [
  {
    question: 'Quando devo trocar o óleo do carro?',
    answer:
      'Siga sempre o manual do veículo, que indica a quilometragem ou o prazo (o que ocorrer primeiro). Como referência geral, o óleo mineral costuma ser trocado perto de 5.000 km, o semissintético perto de 7.000 km e o sintético perto de 10.000 km. Uso severo, como trânsito pesado e trajetos curtos, pode pedir trocas mais frequentes.',
  },
  {
    question: 'Qual óleo devo usar no meu carro?',
    answer:
      'O correto é o indicado pelo fabricante no manual: a viscosidade (por exemplo, 5W-30) e a especificação exigida pelo motor. Se tiver dúvida, informe marca, modelo, ano e motor do seu veículo no formulário do site ou fale com a nossa equipe pelo WhatsApp.',
  },
  {
    question: 'Preciso trocar o filtro junto com o óleo?',
    answer:
      'Em geral, recomenda-se trocar o filtro de óleo a cada troca de óleo, para que o óleo novo não circule por um filtro saturado. Confirme a recomendação para o seu modelo no manual do veículo.',
  },
  {
    question: 'Quanto tempo demora uma troca de óleo?',
    answer:
      'O tempo depende do veículo e do movimento da loja. Para evitar espera, agende o seu horário pelo site ou pelo WhatsApp e combine o melhor momento com a nossa equipe.',
  },
  {
    question: 'Posso agendar minha troca de óleo?',
    answer:
      'Sim. Use o formulário de agendamento do site ou o botão de WhatsApp: você envia uma mensagem pronta e a equipe confirma o horário com você.',
  },
  {
    question: 'Onde fazer troca de óleo em Jarinu?',
    answer: `A ${business.name} fica na ${address}, em Jarinu - SP, próximo a Atibaia, Campo Limpo Paulista e Jundiaí. Use o botão "Como chegar" do site para ver o mapa.`,
  },
  {
    question: 'Quais produtos e serviços a loja oferece?',
    answer:
      'Troca de óleo, venda de óleos, aditivos e filtros, limpeza a seco do motor, higienização do ar-condicionado, produtos de limpeza automotiva e acessórios, como palhetas, calotas, tapetes, aromatizantes e capas de volante.',
  },
]
