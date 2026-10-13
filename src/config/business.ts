// Dados da empresa — edite aqui, o layout lê tudo deste arquivo.
export const business = {
  name: 'Novamix Center',
  tagline: 'Troca de Óleo',
  city: 'Jarinu',
  state: 'SP',

  // Número no formato internacional, só dígitos (55 + DDD + número).
  whatsappNumber: '5511999580158',
  phoneDisplay: '(11) 99958-0158',

  address: {
    street: 'R. Ver. Hermínio Contesini, 222',
    neighborhood: 'Centro',
    city: 'Jarinu - SP',
    cep: '13240-025',
  },

  // TODO: confirmar horários oficiais com o cliente (as informações públicas
  // divergem no sábado: 13h / 14h). Enquanto vazio, o site mostra "consulte".
  hours: [] as { label: string; value: string }[],

  // Nomes pelos quais as pessoas também procuram a loja (usado no JSON-LD).
  alternateNames: ['Nova Mix Center', 'Novamix'],

  // Cidades atendidas (cada uma tem sua página em /troca-de-oleo-<cidade>/).
  // TODO: confirmar com o cliente que estas são as cidades que a loja realmente quer divulgar.
  serviceAreas: [
    { name: 'Jarinu', path: '/troca-de-oleo-jarinu/' },
    { name: 'Várzea Paulista', path: '/troca-de-oleo-varzea-paulista/' },
    { name: 'Campo Limpo Paulista', path: '/troca-de-oleo-campo-limpo-paulista/' },
  ],
  // Cidades vizinhas citadas só como referência de localização (a loja não declara atendimento específico).
  nearbyCities: ['Atibaia', 'Jundiaí'],

  instagramUrl: 'https://www.instagram.com/novamixcenter',
  instagramHandle: '@novamixcenter',

  // Avaliação pública do Google Maps (informada pelo cliente).
  googleRating: { score: '4.7', count: 22 },

  // Marcas de produtos vendidos na loja (citadas nas informações públicas).
  brands: ['Bonix', 'Castrol', 'Magnum', 'Vonixx', 'Pérola', 'Rodabrill', 'Proauto'],
}

export const fullAddress = `${business.address.street} - ${business.address.neighborhood}, ${business.address.city}, ${business.address.cep}`

export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${business.name} ${fullAddress}`,
)}`

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  fullAddress,
)}&output=embed`
