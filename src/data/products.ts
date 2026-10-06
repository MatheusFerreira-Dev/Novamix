import { messages } from '../lib/whatsapp'

export type ProductKind = 'oil' | 'lubricant' | 'filter' | 'accessory' | 'exterior' | 'freshener' | 'wheel'

export interface ProductSlideData {
  id: string
  kind: ProductKind
  /** nome do arquivo em src/assets/products (sem extensão) */
  imageName: string
  /** texto alternativo da foto (descreve o que aparece na imagem) */
  alt: string
  /** categoria exibida acima do título */
  kicker: string
  /** nome usado na mensagem do WhatsApp */
  name: string
  title: string[]
  text: string
  cta: string
  /** palavras decorativas — não são especificações técnicas */
  tags: string[]
  /** marca(s) — só preencher quando for informação real */
  brandLine?: string
  waMessage: string
}

export const productBrand = 'BONIX ÓLEOS E ACESSÓRIOS'

// TODO: quando houver dados reais de cada produto (nome da linha, etc.), adicionar aqui
// sem inventar especificações, preços ou certificações.
export const products: ProductSlideData[] = [
  {
    id: 'oleos',
    kind: 'oil',
    imageName: 'oleos',
    alt: 'Frascos de óleo lubrificante para motores automotivos de diferentes marcas',
    kicker: 'Óleos lubrificantes',
    name: 'Óleos lubrificantes Bonix',
    title: ['Proteção começa', 'pelo óleo certo.'],
    text: 'Um bom óleo lubrificante ajuda a reduzir o atrito, proteger componentes internos e manter o motor trabalhando de forma eficiente.',
    cta: 'Ver produto',
    tags: ['Viscosidade', 'Proteção', 'Performance', 'Motor'],
    brandLine: productBrand,
    waMessage: messages.product('Óleos lubrificantes Bonix'),
  },
  {
    id: 'filtros',
    kind: 'filter',
    imageName: 'filtros',
    alt: 'Filtros de óleo e filtros automotivos de várias marcas',
    kicker: 'Filtros',
    name: 'Filtros',
    title: ['Pequeno no tamanho.', 'Essencial na proteção.'],
    text: 'Filtros ajudam a manter o sistema livre de impurezas e contribuem para o funcionamento adequado do veículo.',
    cta: 'Ver filtros',
    tags: ['Impurezas', 'Motor', 'Manutenção'],
    waMessage: messages.product('Filtros'),
  },
  {
    id: 'lubrificantes',
    kind: 'lubricant',
    imageName: 'lubrificantes',
    alt: 'Líquidos de arrefecimento para radiador em frascos de 1 litro, em várias cores',
    kicker: 'Lubrificantes e aditivos',
    name: 'Lubrificantes e aditivos',
    title: ['Performance que', 'começa por dentro.'],
    text: 'Produtos desenvolvidos para auxiliar na proteção e no funcionamento adequado dos componentes do veículo.',
    cta: 'Conhecer',
    tags: ['Atrito', 'Proteção', 'Componentes'],
    brandLine: productBrand,
    waMessage: messages.product('Lubrificantes e aditivos'),
  },
  {
    id: 'limpeza-externa',
    kind: 'exterior',
    imageName: 'limpeza-externa',
    alt: 'Produtos de limpeza e estética automotiva Vonixx: shampoos, ceras, aplicadores e toalhas',
    kicker: 'Limpeza automotiva',
    name: 'Produtos de limpeza automotiva',
    title: ['Brilho por fora,', 'cuidado por inteiro.'],
    text: 'Produtos de limpeza automotiva para cuidar da aparência da lataria, das rodas e dos pneus.',
    cta: 'Ver produtos',
    tags: ['Lataria', 'Rodas', 'Brilho'],
    brandLine: 'Vonixx · Pérola · Rodabrill · Proauto',
    waMessage: messages.product('Produtos de limpeza automotiva'),
  },
  {
    id: 'cheirinhos',
    kind: 'freshener',
    imageName: 'cheirinhos',
    alt: 'Aromatizantes automotivos em formato de árvore, em vários aromas',
    kicker: 'Cheirinhos e aromatizantes',
    name: 'Cheirinhos e aromatizantes',
    title: ['Um carro com', 'cheiro de cuidado.'],
    text: 'Aromatizantes para deixar o interior do carro agradável em cada trajeto.',
    cta: 'Conhecer',
    tags: ['Aromas', 'Conforto', 'Interior'],
    waMessage: messages.product('Cheirinhos e aromatizantes'),
  },
  {
    id: 'capas-volante',
    kind: 'wheel',
    imageName: 'capas-volante',
    alt: 'Capas de volante em diferentes cores e acabamentos',
    kicker: 'Capas de volante',
    name: 'Capas de volante',
    title: ['Mais conforto', 'em cada volta.'],
    text: 'Capas de volante para proteger e dar um toque de personalidade ao seu carro.',
    cta: 'Ver capas',
    tags: ['Conforto', 'Estilo', 'Proteção'],
    waMessage: messages.product('Capas de volante'),
  },
  {
    id: 'acessorios',
    kind: 'accessory',
    imageName: 'acessorios',
    alt: 'Calotas automotivas de diferentes modelos',
    kicker: 'Acessórios automotivos',
    name: 'Acessórios automotivos',
    title: ['Os detalhes também', 'fazem diferença.'],
    text: 'Encontre acessórios e itens essenciais para cuidar do seu veículo no dia a dia, como palhetas, calotas e tapetes.',
    cta: 'Ver acessórios',
    tags: ['Palhetas', 'Calotas', 'Tapetes'],
    waMessage: messages.product('Acessórios automotivos'),
  },
]
