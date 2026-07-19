import { LabViewerShell } from '@/lab/lab-viewer-shell'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lab | Tommy Chow',
  description: 'Components, mock pages, interactive art, and web experiments.',
}

export default function LabViewerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <LabViewerShell>{children}</LabViewerShell>
}
