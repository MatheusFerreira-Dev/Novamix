import { business } from '../config/business.ts'

export interface PageBlock {
  heading: string
  paragraphs?: string[]
  list?: string[]
}

export interface LandingPageData {
  /** caminho público, com barras (também é o nome da pasta do HTML) */
  path: string
  title: string
  description: string
  h1: string
  /** texto curto abaixo do título */
  lead: string
  /** rótulo do último item da trilha de navegação */
  breadcrumb: string
  blocks: PageBlock[]
  /** mostra a seção "Como funciona" (etapas) */
  showProcess?: boolean
  faq: { question: string; answer: string }[]
  waMessage: string
}

const addr = `${business.address.street}, ${business.address.neighborhood}, ${business.address.city} (CEP ${business.address.cep})`

const servicos = [
  'Troca de óleo',
  'Venda de óleos, aditivos e filtros',
  'Limpeza a seco do motor',
  'Higienização do ar-condicionado',
  'Produtos de limpeza e acessórios automotivos',
]

const horarioFaq = {
  question: 'Qual o horário de funcionamento?',
  answer: 'Para confirmar o horário de atendimento, fale com a nossa equipe pelo WhatsApp antes de vir à loja.',
}

// Textos escritos sem inventar fatos: não há tempo de deslocamento, preços ou horários.
// TODO: quando houver informações reais (pontos de referência, rotas, horários), enriquecer cada página.
export const landingPages: LandingPageData[] = [
  {
    path: '/troca-de-oleo-jarinu/',
    title: 'Troca de Óleo em Jarinu - SP | Novamix Center',
    description:
      'Troca de óleo em Jarinu - SP na Novamix Center: óleos, filtros, lubrificantes e acessórios. Veja endereço e serviços e agende pelo WhatsApp.',
    h1: 'Troca de óleo em Jarinu - SP',
    lead: 'Troca de óleo, filtros, lubrificantes e acessórios automotivos no Centro de Jarinu, com agendamento pelo WhatsApp.',
    breadcrumb: 'Troca de óleo em Jarinu',
    showProcess: true,
    waMessage: 'Olá! Gostaria de agendar uma troca de óleo em Jarinu para o meu veículo.',
    blocks: [
      {
        heading: 'Loja de troca de óleo em Jarinu',
        paragraphs: [
          'A Novamix Center é uma loja de troca de óleo no Centro de Jarinu - SP. Trabalhamos com óleos minerais, semissintéticos e sintéticos e ajudamos você a escolher o produto adequado ao seu veículo, sempre seguindo o manual do fabricante.',
          'Além do óleo, você encontra filtros, lubrificantes, produtos de limpeza e acessórios automotivos no mesmo lugar.',
        ],
      },
      { heading: 'Serviços e produtos', list: servicos },
      {
        heading: 'Onde estamos',
        paragraphs: [`Estamos na ${addr}. Fica no Centro de Jarinu, perto de ${business.nearbyCities.join(' e ')}.`],
      },
    ],
    faq: [
      {
        question: 'Onde fazer troca de óleo em Jarinu?',
        answer: `Na Novamix Center, na ${addr}. Use o botão "Como chegar" para ver o mapa.`,
      },
      {
        question: 'Preciso agendar a troca de óleo?',
        answer: 'Você pode agendar pelo formulário do site ou pelo WhatsApp, com uma mensagem pronta. Assim a equipe combina o melhor horário com você.',
      },
      {
        question: 'Qual óleo é o ideal para o meu carro?',
        answer: 'O indicado pelo fabricante no manual do veículo. Informe marca, modelo, ano e motor e nossa equipe ajuda a escolher entre mineral, semissintético e sintético.',
      },
      horarioFaq,
    ],
  },
  {
    path: '/troca-de-oleo-varzea-paulista/',
    title: 'Troca de Óleo em Várzea Paulista | Novamix Center',
    description:
      'Mora em Várzea Paulista? A Novamix Center faz troca de óleo, filtros e acessórios em Jarinu - SP. Veja como chegar e agende pelo WhatsApp.',
    h1: 'Troca de óleo em Várzea Paulista e região',
    lead: 'Atendemos clientes de Várzea Paulista na Novamix Center, em Jarinu - SP: troca de óleo, filtros, lubrificantes e acessórios.',
    breadcrumb: 'Troca de óleo em Várzea Paulista',
    showProcess: true,
    waMessage: 'Olá! Sou de Várzea Paulista e gostaria de agendar uma troca de óleo para o meu veículo.',
    blocks: [
      {
        heading: 'Troca de óleo para quem é de Várzea Paulista',
        paragraphs: [
          'Se você mora ou trabalha em Várzea Paulista e procura um lugar para fazer a troca de óleo do carro, a Novamix Center atende no Centro de Jarinu - SP.',
          'Antes de vir, fale com a equipe pelo WhatsApp: você informa marca, modelo e ano do veículo, confirma o horário e já deixa o óleo e o filtro definidos.',
        ],
      },
      { heading: 'O que a loja oferece', list: servicos },
      {
        heading: 'Onde fica a loja',
        paragraphs: [`${addr}. Use o botão "Como chegar" para abrir o mapa e traçar a rota a partir de onde você está.`],
      },
    ],
    faq: [
      {
        question: 'Vocês atendem clientes de Várzea Paulista?',
        answer: `Sim. A loja recebe clientes de Várzea Paulista e região. A unidade fica em Jarinu - SP, na ${addr}.`,
      },
      {
        question: 'Como agendar a troca de óleo vindo de Várzea Paulista?',
        answer: 'Pelo formulário do site ou pelo WhatsApp. Informe o veículo e o melhor horário, e a equipe confirma com você.',
      },
      horarioFaq,
    ],
  },
  {
    path: '/troca-de-oleo-campo-limpo-paulista/',
    title: 'Troca de Óleo em Campo Limpo Paulista | Novamix Center',
    description:
      'Procura troca de óleo perto de Campo Limpo Paulista? A Novamix Center fica em Jarinu - SP: óleos, filtros e acessórios. Agende pelo WhatsApp.',
    h1: 'Troca de óleo em Campo Limpo Paulista e região',
    lead: 'Atendemos clientes de Campo Limpo Paulista na Novamix Center, em Jarinu - SP: troca de óleo, filtros, lubrificantes e acessórios.',
    breadcrumb: 'Troca de óleo em Campo Limpo Paulista',
    showProcess: true,
    waMessage: 'Olá! Sou de Campo Limpo Paulista e gostaria de agendar uma troca de óleo para o meu veículo.',
    blocks: [
      {
        heading: 'Troca de óleo para quem é de Campo Limpo Paulista',
        paragraphs: [
          'Se você mora ou trabalha em Campo Limpo Paulista e quer fazer a troca de óleo do seu carro, a Novamix Center atende no Centro de Jarinu - SP.',
          'Fale com a equipe pelo WhatsApp antes de vir: assim você já informa o veículo, escolhe o óleo adequado e combina o horário.',
        ],
      },
      { heading: 'O que a loja oferece', list: servicos },
      {
        heading: 'Onde fica a loja',
        paragraphs: [`${addr}. Use o botão "Como chegar" para abrir o mapa e traçar a rota a partir de onde você está.`],
      },
    ],
    faq: [
      {
        question: 'Vocês atendem clientes de Campo Limpo Paulista?',
        answer: `Sim. A loja recebe clientes de Campo Limpo Paulista e região. A unidade fica em Jarinu - SP, na ${addr}.`,
      },
      {
        question: 'Preciso levar algo para fazer a troca de óleo?',
        answer: 'Leve o veículo e, se tiver, o manual do proprietário. Se preferir, informe marca, modelo, ano e motor pelo WhatsApp antes de vir.',
      },
      horarioFaq,
    ],
  },
  {
    path: '/acessorios-automotivos/',
    title: 'Acessórios e Produtos Automotivos em Jarinu | Novamix',
    description:
      'Acessórios e produtos automotivos em Jarinu - SP: óleos, filtros, produtos de limpeza, cheirinhos, capas de volante e calotas. Consulte pelo WhatsApp.',
    h1: 'Acessórios e produtos automotivos em Jarinu - SP',
    lead: 'Da troca de óleo aos detalhes do dia a dia: produtos e acessórios para cuidar do seu carro, na Novamix Center.',
    breadcrumb: 'Acessórios automotivos',
    waMessage: 'Olá! Gostaria de saber mais sobre os acessórios e produtos automotivos disponíveis.',
    blocks: [
      {
        heading: 'Produtos para o seu carro',
        list: [
          'Óleos lubrificantes, lubrificantes e aditivos',
          'Filtros',
          'Produtos de limpeza automotiva',
          'Cheirinhos e aromatizantes',
          'Capas de volante',
          'Calotas, palhetas e tapetes',
        ],
      },
      {
        heading: 'Marcas',
        paragraphs: [
          `A loja trabalha com marcas como ${business.brands.join(', ')}. Para saber se um produto ou marca específica está disponível, consulte a equipe pelo WhatsApp.`,
        ],
      },
      {
        heading: 'Onde comprar em Jarinu',
        paragraphs: [`Na Novamix Center, na ${addr}. A loja também faz a troca de óleo do seu veículo.`],
      },
    ],
    faq: [
      {
        question: 'Vocês vendem acessórios para carro em Jarinu?',
        answer: 'Sim. A loja tem acessórios como calotas, palhetas, tapetes, capas de volante e aromatizantes, além de produtos de limpeza automotiva.',
      },
      {
        question: 'Como saber se um produto está disponível?',
        answer: 'Chame a equipe pelo WhatsApp com o nome do produto ou o que você procura. A disponibilidade varia conforme o estoque.',
      },
    ],
  },
]

export const findPage = (path: string) => landingPages.find((p) => p.path === path)
