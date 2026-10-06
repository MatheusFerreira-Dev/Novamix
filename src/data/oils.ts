// Tipos de óleo — conteúdo informativo (sem preço/custo). Intervalos são referências gerais.
export interface OilType {
  id: string
  name: string
  km: string
  intro: string[]
  features: string[]
}

export const oilTypes: OilType[] = [
  {
    id: 'mineral',
    name: 'Óleo Mineral',
    km: '5.000',
    intro: [
      'Óleo produzido a partir do petróleo refinado, com uma base lubrificante tradicional.',
      'Ajuda a reduzir o atrito entre as peças internas do motor e formar uma película de proteção durante o funcionamento.',
    ],
    features: [
      'Base mineral',
      'Formulação tradicional',
      'Boa capacidade de lubrificação',
      'Menor resistência à oxidação em comparação aos sintéticos',
      'Pode degradar mais rapidamente em condições severas de uso',
    ],
  },
  {
    id: 'semissintetico',
    name: 'Óleo Semissintético',
    km: '7.000',
    intro: [
      'Combina bases minerais e sintéticas, proporcionando maior estabilidade e resistência à degradação.',
      'Ajuda na lubrificação das peças internas e na proteção do motor durante diferentes condições de funcionamento.',
    ],
    features: [
      'Combinação de bases minerais e sintéticas',
      'Maior resistência à oxidação',
      'Boa estabilidade em diferentes temperaturas',
      'Ajuda a reduzir o desgaste',
      'Mantém suas propriedades por mais tempo que um óleo mineral convencional',
    ],
  },
  {
    id: 'sintetico',
    name: 'Óleo Sintético',
    km: '10.000',
    intro: [
      'Desenvolvido a partir de bases produzidas por processos químicos controlados, proporcionando maior estabilidade e resistência à oxidação.',
      'É capaz de manter suas propriedades por mais tempo e oferece excelente proteção em diferentes condições de temperatura.',
    ],
    features: [
      'Maior estabilidade molecular',
      'Excelente resistência à oxidação',
      'Boa estabilidade em altas e baixas temperaturas',
      'Mantém suas propriedades por mais tempo',
      'Ajuda a reduzir o desgaste das peças internas',
      'Auxilia na proteção do motor contra altas temperaturas',
    ],
  },
]
