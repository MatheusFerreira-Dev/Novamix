// Resolve quando a abertura com a logo termina. O vídeo do Hero espera por isso para começar.
let resolve: () => void = () => {}
export const splashDone = new Promise<void>((r) => {
  resolve = r
})
export const finishSplash = () => resolve()
