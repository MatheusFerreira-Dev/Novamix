import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { business } from './src/config/business.ts'
import { seo } from './src/config/seo.ts'
import { faq } from './src/data/faq.ts'
import { landingPages } from './src/data/pages.ts'

/**
 * URL pública do site (canonical, Open Graph, sitemap, JSON-LD).
 * Defina SITE_URL no Vercel (Settings → Environment Variables), ex.: https://novamixcenter.com.br
 * Sem SITE_URL, usa o domínio de produção do próprio Vercel; sem nenhum dos dois, usa um placeholder
 * claramente falso para você não esquecer de configurar.
 */
const PLACEHOLDER = 'https://SEU-DOMINIO.com.br'
const siteUrl = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : PLACEHOLDER)
).replace(/\/+$/, '')

interface PageMeta {
  path: string
  title: string
  description: string
  breadcrumb?: string
  faq: { question: string; answer: string }[]
}

const homeMeta: PageMeta = { path: '/', title: seo.title, description: seo.description, faq }
const pageByHtml = new Map<string, PageMeta>([
  ['/index.html', homeMeta],
  ...landingPages.map((p) => [`${p.path}index.html`, { ...p } as PageMeta] as [string, PageMeta]),
])

const jsonLd = (page: PageMeta) => {
  const bizId = `${siteUrl}/#negocio`
  const pageUrl = `${siteUrl}${page.path}`
  const ogImage = `${siteUrl}/og-image.jpg`
  const isHome = page.path === '/'
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: seo.shortName,
      inLanguage: 'pt-BR',
      publisher: { '@id': bizId },
    },
    {
      '@type': 'AutoRepair',
      '@id': bizId,
      name: seo.fullName,
      alternateName: business.alternateNames,
      description: seo.businessDescription,
      url: `${siteUrl}/`,
      image: ogImage,
      logo: `${siteUrl}/logo.png`,
      telephone: `+${business.whatsappNumber}`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: business.address.street,
        addressLocality: business.city,
        addressRegion: business.state,
        postalCode: business.address.cep,
        addressCountry: 'BR',
      },
      areaServed: business.serviceAreas.map((a) => ({ '@type': 'City', name: a.name })),
      sameAs: [business.instagramUrl],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Serviços e produtos',
        itemListElement: seo.offeredServices.map((name) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name },
        })),
      },
      // TODO (preencher quando confirmado): openingHoursSpecification e geo (latitude/longitude).
    },
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: page.title,
      description: page.description,
      inLanguage: 'pt-BR',
      isPartOf: { '@id': `${siteUrl}/#website` },
      about: { '@id': bizId },
      primaryImageOfPage: ogImage,
    },
  ]
  if (!isHome) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: page.breadcrumb ?? page.title, item: pageUrl },
      ],
    })
  }
  if (page.faq.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: page.faq.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    })
  }
  return { '@context': 'https://schema.org', '@graph': graph }
}

function seoPlugin(): Plugin {
  return {
    name: 'novamix-seo',
    transformIndexHtml(html, ctx) {
      const key = (ctx.path || '/index.html').split('?')[0]
      const page = pageByHtml.get(key) ?? homeMeta
      const gsc = process.env.GOOGLE_SITE_VERIFICATION
      const gscTag = gsc
        ? `<meta name="google-site-verification" content="${gsc}" />`
        : '<!-- Search Console: defina GOOGLE_SITE_VERIFICATION no Vercel para inserir a meta tag de verificação aqui -->'
      return html
        .replaceAll('__CANONICAL__', `${siteUrl}${page.path}`)
        .replaceAll('__SITE_URL__', siteUrl)
        .replaceAll('__TITLE__', page.title)
        .replaceAll('__DESCRIPTION__', page.description)
        .replace('__GSC_META__', gscTag)
        .replace('__JSON_LD__', JSON.stringify(jsonLd(page)).replaceAll('<', '\\u003c'))
    },
    generateBundle() {
      if (siteUrl === PLACEHOLDER) {
        this.warn('SITE_URL não definido: canonical/sitemap/JSON-LD usam o placeholder ' + PLACEHOLDER)
      }
      const today = new Date().toISOString().slice(0, 10)
      const urls = [homeMeta, ...landingPages]
        .map(
          (p) =>
            `  <url>\n    <loc>${siteUrl}${p.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${p.path === '/' ? '1.0' : '0.8'}</priority>\n  </url>`,
        )
        .join('\n')
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      })
    },
  }
}

// Cada página local é um HTML próprio (título, descrição, canonical e JSON-LD próprios) — ver pasta de cada rota.
const htmlInputs: Record<string, string> = { main: 'index.html' }
for (const p of landingPages) htmlInputs[p.path.replaceAll('/', '')] = `${p.path.slice(1)}index.html`

export default defineConfig({
  plugins: [react(), tailwindcss(), seoPlugin()],
  build: {
    rollupOptions: { input: htmlInputs },
  },
  server: {
    watch: {
      // o OneDrive perde eventos de arquivo (módulos ficavam desatualizados → tela branca):
      // polling é mais confiável aqui
      usePolling: true,
      interval: 300,
      // vídeo grande em public/ é travado pelo OneDrive (EBUSY)
      ignored: ['**/public/**'],
    },
  },
})
