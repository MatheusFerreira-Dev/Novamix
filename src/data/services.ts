import { ClipboardCheck, Droplets, FlaskConical, Filter, Sparkles, Wind, Wrench } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Service {
  id: string
  title: string
  text: string
  icon: LucideIcon
}

export const services: Service[] = [
  {
    id: 'troca-de-oleo',
    title: 'Troca de óleo',
    text: 'Óleo adequado para o seu veículo, seguindo as especificações recomendadas.',
    icon: Droplets,
  },
  {
    id: 'filtros',
    title: 'Filtros',
    text: 'Filtros para manter o motor protegido e funcionando corretamente.',
    icon: Filter,
  },
  {
    id: 'lubrificantes',
    title: 'Lubrificantes',
    text: 'Produtos selecionados para diferentes necessidades e aplicações.',
    icon: FlaskConical,
  },
  {
    id: 'limpeza-motor',
    title: 'Limpeza a seco do motor',
    text: 'Cuidado com a aparência e a conservação do compartimento do motor.',
    icon: Sparkles,
  },
  {
    id: 'ar-condicionado',
    title: 'Higienização do ar-condicionado',
    text: 'Higienização do sistema de ar-condicionado do seu veículo.',
    icon: Wind,
  },
  {
    id: 'acessorios',
    title: 'Acessórios',
    text: 'Itens essenciais para manutenção e cuidado do veículo, além de produtos de limpeza automotiva.',
    icon: Wrench,
  },
  {
    id: 'avaliacao',
    title: 'Avaliação',
    text: 'Orientação para identificar necessidades de manutenção.',
    icon: ClipboardCheck,
  },
]
