import { LabToolbar } from '@/lab/lab-toolbar'

export function LabViewerShell({ children }: { children: React.ReactNode }) {
  return (
    <div className='grid min-h-svh grid-rows-[auto_1fr] bg-background text-foreground'>
      <LabToolbar />
      <main className='min-h-0 min-w-0 overflow-auto'>{children}</main>
    </div>
  )
}
