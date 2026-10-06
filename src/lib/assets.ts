// Fotos opcionais: basta soltar o arquivo nas pastas e elas aparecem sozinhas.
const productFiles = import.meta.glob('../assets/products/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const imageFiles = import.meta.glob('../assets/images/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const pick = (files: Record<string, string>, name: string) =>
  Object.entries(files).find(([path]) =>
    new RegExp(`/${name}\\.[a-z]+$`, 'i').test(path),
  )?.[1]

const brandFiles = import.meta.glob('../assets/brands/*.{svg,png,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

export const brandLogo = (slug: string) => pick(brandFiles, slug)
export const productImage = (name: string) => pick(productFiles, name)
export const siteImage = (name: 'hero' | 'about') => pick(imageFiles, name)
