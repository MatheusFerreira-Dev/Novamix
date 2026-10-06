import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { business } from './src/config/business.ts'
import { seo } from './src/config/seo.ts'
import { faq } from './src/data/faq.ts'

/**
 * URL pública do site (canonical, Open Graph, sitemap, JSON-LD).
 * Defina SITE_URL no Vercel (Settings → Environment Variables), ex.: https://www.seudominio.com.br
 * Sem SITE_URL, usa o domínio de produção do próprio Vercel; sem nenhum dos dois, usa um placeholder
 * claramente falso para você não esquecer de configurar.
 */
const PLACEHOLDER = 'https://SEU-DOMINIO.com.br'
const siteUrl = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : PLACEHOLDER)
).replace(/\/+$/, '')

const jsonLd = () => {
  const bizId = `${siteUrl}/#negocio`
  const ogImage = `${siteUrl}/og-image.jpg`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: seo.shortName,
        inLanguage: 'pt-BR',
        publisher: { '@id': bizId },
      },
      {
        '@type': 'AutomotiveBusiness',
        '@id': bizId,
        name: seo.fullName,
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
        areaServed: { '@type': 'City', name: business.city },
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
        '@id': `${siteUrl}/#webpage`,
        url: `${siteUrl}/`,
        name: seo.title,
        description: seo.description,
        inLanguage: 'pt-BR',
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': bizId },
        primaryImageOfPage: ogImage,
      },
      {
        '@type': 'FAQPage',
        '@id': `${siteUrl}/#faq`,
        mainEntity: faq.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      },
    ],
  }
}

function seoPlugin(): Plugin {
  return {
    name: 'novamix-seo',
    transformIndexHtml(html) {
      const gsc = process.env.GOOGLE_SITE_VERIFICATION
      const gscTag = gsc
        ? `<meta name="google-site-verification" content="${gsc}" />`
        : '<!-- Search Console: defina GOOGLE_SITE_VERIFICATION no Vercel para inserir a meta tag de verificação aqui -->'
      return html
        .replaceAll('__SITE_URL__', siteUrl)
        .replaceAll('__TITLE__', seo.title)
        .replaceAll('__DESCRIPTION__', seo.description)
        .replace('__GSC_META__', gscTag)
        .replace('__JSON_LD__', JSON.stringify(jsonLd()).replaceAll('<', '\\u003c'))
    },
    generateBundle() {
      if (siteUrl === PLACEHOLDER) {
        this.warn('SITE_URL não definido: canonical/sitemap/JSON-LD usam o placeholder ' + PLACEHOLDER)
      }
      const today = new Date().toISOString().slice(0, 10)
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteUrl}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoPlugin()],
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
