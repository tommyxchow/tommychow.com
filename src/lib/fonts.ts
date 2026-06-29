import localFont from 'next/font/local'

export const fontSans = localFont({
  src: '../app/UncutSans-Variable.woff2',
  variable: '--font-sans',
})

export const fontMono = localFont({
  src: '../app/Lilex-Variable.woff2',
  variable: '--font-mono',
  weight: '100 700',
})
