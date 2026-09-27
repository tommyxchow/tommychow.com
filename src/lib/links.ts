export const EMAIL = 'tommyxchow@gmail.com'

export type LinkInfo =
  | {
      label: string
      href: string
    }
  | {
      label: string
      copyValue: string
    }

export const links: LinkInfo[] = [
  { label: 'Email', copyValue: EMAIL },
  { label: 'GitHub', href: 'https://github.com/tommyxchow' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/tommy-chow/' },
]
