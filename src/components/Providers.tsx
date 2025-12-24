import { ThemeProvider } from 'next-themes'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute='class'
      forcedTheme='dark'
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}
