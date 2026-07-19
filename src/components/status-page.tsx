import { narrowPageContainerClassName } from '@/lib/constants'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { type ComponentProps, type ReactNode } from 'react'
import { twJoin } from 'tailwind-merge'

const actionClassName =
  'text-muted-foreground transition-colors hover:text-foreground'

interface StatusPageProps {
  title: string
  actions?: ReactNode
}

export function StatusPage({ title, actions }: StatusPageProps) {
  return (
    <div
      className={twJoin(
        narrowPageContainerClassName,
        'gap-4 font-mono text-xs uppercase',
      )}
    >
      <h1 className='text-xs/relaxed text-foreground'>{title}</h1>
      {actions != null ? (
        <div className='flex flex-wrap items-center gap-x-3 gap-y-1'>
          {actions}
        </div>
      ) : null}
    </div>
  )
}

export function StatusPageAction({
  className,
  type = 'button',
  ...props
}: ComponentProps<'button'>) {
  return (
    <button type={type} className={cn(actionClassName, className)} {...props} />
  )
}

export function StatusPageLink({
  className,
  ...props
}: ComponentProps<typeof Link>) {
  return <Link className={cn(actionClassName, className)} {...props} />
}
