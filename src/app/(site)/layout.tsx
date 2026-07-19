import { Header } from '@/components/header'
import { PixelatedBackground } from '@/components/pixelated-background'

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
