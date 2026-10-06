import type { ProductKind } from '../data/products'
import { productImage } from '../lib/assets'

const stroke = { fill: 'none', stroke: '#f58a1f', strokeWidth: 3, strokeLinejoin: 'round', strokeLinecap: 'round' } as const
const soft = { fill: 'none', stroke: '#fff', strokeOpacity: 0.18, strokeWidth: 2 } as const

/** Silhuetas de apoio exibidas enquanto não há foto real em src/assets/products */
function Silhouette({ kind }: { kind: ProductKind }) {
  switch (kind) {
    case 'oil':
      return (
        <g>
          <path d="M165 120h70v26l30 44v150a22 22 0 0 1-22 22H157a22 22 0 0 1-22-22V190l30-44Z" {...stroke} />
          <rect x="172" y="84" width="56" height="36" rx="6" {...stroke} />
          <path d="M135 250h130M135 290h130" {...soft} />
          <path d="M200 205c0 0-22 26-22 42a22 22 0 0 0 44 0c0-16-22-42-22-42Z" fill="#f58a1f" />
        </g>
      )
    case 'lubricant':
      return (
        <g>
          <rect x="130" y="120" width="140" height="240" rx="20" {...stroke} />
          <path d="M150 120l10-32h80l10 32" {...stroke} />
          <rect x="185" y="62" width="30" height="26" rx="4" {...stroke} />
          <path d="M130 200h140M130 280h140" {...soft} />
          <circle cx="200" cy="240" r="26" {...stroke} />
        </g>
      )
    case 'filter':
      return (
        <g>
          <rect x="128" y="130" width="144" height="190" rx="14" {...stroke} />
          <rect x="140" y="104" width="120" height="28" rx="8" {...stroke} />
          <ellipse cx="200" cy="320" rx="72" ry="12" {...stroke} />
          <path d="M156 160v140M178 160v140M200 160v140M222 160v140M244 160v140" {...soft} />
          <circle cx="200" cy="230" r="22" fill="#f58a1f" fillOpacity="0.9" />
        </g>
      )
    case 'exterior':
      return (
        <g>
          <rect x="150" y="150" width="100" height="200" rx="18" {...stroke} />
          <path d="M165 150v-28h54l22 12v16" {...stroke} />
          <path d="M241 134h30M241 148h24" {...soft} />
          <path d="M150 230h100" {...soft} />
          <path d="M90 120l-10-24M110 104l-4-28M70 140l-26-8" {...stroke} />
        </g>
      )
    case 'freshener':
      return (
        <g>
          <path d="M200 70l-70 110h40l-60 100h180l-60-100h40Z" {...stroke} />
          <path d="M200 280v70" {...stroke} />
          <circle cx="200" cy="110" r="10" fill="#f58a1f" />
          <path d="M160 360h80" {...soft} />
        </g>
      )
    case 'wheel':
      return (
        <g>
          <circle cx="200" cy="200" r="130" {...stroke} />
          <circle cx="200" cy="200" r="34" {...stroke} />
          <path d="M70 200h96M234 200h96M200 234v96" {...stroke} />
          <circle cx="200" cy="200" r="104" {...soft} />
        </g>
      )
    case 'accessory':
      return (
        <g>
          <path d="M92 270c60-120 156-120 216 0" {...stroke} />
          <path d="M92 270c60-100 156-100 216 0" {...soft} />
          <path d="M200 120v150" {...stroke} />
          <circle cx="200" cy="288" r="14" fill="#f58a1f" />
          <path d="M120 330h160" {...soft} />
        </g>
      )
  }
}

export default function ProductVisual({ kind, imageName, alt }: { kind: ProductKind; imageName: string; alt: string }) {
  const src = productImage(imageName)
  if (src) {
    // fotos (jpg/webp) ficam inteiras num quadro branco; recortes de embalagem (png, fundo transparente) ficam inteiros
    const isPhoto = /\.(jpe?g|webp)(\?|$)/i.test(src)
    return isPhoto ? (
      <img src={src} alt={alt} loading="lazy" className="h-full w-full rounded-xl bg-white object-contain" />
    ) : (
      <div className="flex h-full w-full items-center justify-center rounded-xl bg-white p-2"><img src={src} alt={alt} loading="lazy" className="max-h-full w-auto max-w-full object-contain" /></div>
    )
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <svg viewBox="40 40 320 320" className="min-h-0 w-full flex-1" aria-hidden="true">
        <Silhouette kind={kind} />
      </svg>
      {/* TODO: remover quando as fotos reais forem adicionadas em src/assets/products */}
      <p className="shrink-0 pb-1 text-[9px] font-bold uppercase tracking-[0.22em] text-white/60">Foto do produto em breve</p>
    </div>
  )
}

