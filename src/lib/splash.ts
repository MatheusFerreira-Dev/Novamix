// Resolve quando a abertura (definida em index.html) termina. O vídeo do Hero espera por isso para começar.
declare global {
  interface Window {
    __splashDone?: boolean
  }
}

export const splashDone = new Promise<void>((resolve) => {
  if (typeof window === 'undefined' || window.__splashDone) {
    resolve()
    return
  }
  window.addEventListener('splash:done', () => resolve(), { once: true })
  window.setTimeout(resolve, 6000) // segurança: nunca bloqueia o vídeo
})