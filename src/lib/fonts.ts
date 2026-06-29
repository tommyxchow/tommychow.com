import localFont from 'next/font/local'

export const fontSans = localFont({
  src: '../app/UncutSans-Variable.woff2',
  variable: '--font-sans',
})

export const fontMono = localFont({
  src: [
    {
      path: '../app/Lilex-Variable.woff2',
      weight: '100 700',
      style: 'normal',
    },
    {
      path: '../app/Lilex-Variable-Italic.woff2',
      weight: '100 700',
      style: 'italic',
    },
  ],
  variable: '--font-mono',
})
