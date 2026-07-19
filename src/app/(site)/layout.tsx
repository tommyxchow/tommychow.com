import { Header } from '@/components/Header'
import { PixelatedBackground } from '@/components/PixelatedBackground'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <PixelatedBackground />
      <Header />
      <main className='grid min-h-dvh grow place-items-center'>{children}</main>
    </>
  )
}
