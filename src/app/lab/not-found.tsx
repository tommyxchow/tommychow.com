import { LabViewerShell } from '@/lab/lab-viewer-shell'
import Link from 'next/link'

export default function LabNotFound() {
  return (
    <LabViewerShell>
      <section className='grid min-h-full w-full place-items-center p-6 font-mono text-xs uppercase'>
        <div className='flex flex-col items-start gap-3'>
          <h1>Experiment not found</h1>
          <Link
            href='/lab'
            className='flex min-h-11 items-center text-muted-foreground underline underline-offset-4 hover:text-foreground focus-visible:rounded-sm focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none'
          >
            View the index
          </Link>
        </div>
      </section>
    </LabViewerShell>
  )
}
