# Novamix Center — site (React + Vite + TypeScript + Tailwind)

Site da Novamix Center Troca de Óleo (Jarinu - SP).

## Rodar localmente

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # gera a pasta dist/
npm run preview    # serve o build em http://localhost:4173
```

## Onde editar

| O quê | Arquivo |
|---|---|
| Dados da empresa (endereço, telefone/WhatsApp, horários, Instagram) | `src/config/business.ts` |
| Título, descrição e serviços usados em SEO / JSON-LD | `src/config/seo.ts` |
| Perguntas frequentes (também geram o FAQ do JSON-LD) | `src/data/faq.ts` |
| Produtos do carrossel | `src/data/products.ts` (fotos em `src/assets/products/`) |
| Mensagens prontas do WhatsApp | `src/lib/whatsapp.ts` |
| Vídeo do Hero | `public/video-fachada.mp4` (+ `public/video-fachada-poster.jpg`) |

## SEO e indexação

`canonical`, Open Graph, `sitemap.xml`, `robots.txt` e o JSON-LD são **gerados no build** por um plugin em `vite.config.ts`,
sempre a partir de uma única URL pública:

| Variável (build) | Para quê |
|---|---|
| `SITE_URL` | URL oficial do site, sem barra no final. Ex.: `https://www.seudominio.com.br` |
| `GOOGLE_SITE_VERIFICATION` | (opcional) código de verificação do Search Console por meta tag |

Sem `SITE_URL`, o build usa o domínio de produção do próprio Vercel; se nem isso existir, usa o placeholder
`https://SEU-DOMINIO.com.br` e mostra um aviso no log do build. Veja `.env.example`.
Essas variáveis **não são segredos** e não vão para o JavaScript do navegador.

## Publicar (GitHub → Vercel)

1. Suba o projeto para um repositório no GitHub (branch `main`).
2. No Vercel: **Add New → Project** → importe o repositório. O Vercel detecta Vite sozinho:
   Build Command `npm run build`, Output Directory `dist`, Install Command `npm install`.
3. Em **Settings → Environment Variables**, cadastre `SITE_URL` (Production) com o domínio oficial.
4. Cada push na `main` gera um deploy de produção automaticamente.
5. Em **Settings → Domains**, adicione o domínio e siga os registros DNS que o Vercel mostrar.

`vercel.json` define cache longo para `/assets/*` (arquivos com hash) e cabeçalhos básicos de segurança.
O site tem uma única página (sem React Router), então não precisa de regras de rewrite.
