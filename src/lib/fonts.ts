import localFont from 'next/font/local'

export const fontSans = localFont({
  src: '../app/UncutSans-Variable.woff2',
  variable: '--font-sans',
})

// Ioskeley Mono ships static weights, and the site only sets mono at 400.
export const fontMono = localFont({
  src: '../app/IoskeleyMono-Regular.woff2',
  variable: '--font-mono',
})
