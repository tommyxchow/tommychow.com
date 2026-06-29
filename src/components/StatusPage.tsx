'use client'

import { HomeClient } from '@/app/HomeClient'
import { type ReactNode } from 'react'

interface StatusPageProps {
  title: string
  message: string
  actions: ReactNode
  eyebrow?: string
  hint?: string
}

export function StatusPage({
  title,
  message,
  actions,
  eyebrow,
  hint,
}: StatusPageProps) {
  return (
    <HomeClient>
      <section key='content' className='flex flex-col gap-3'>
        {eyebrow ? (
          <p className='font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase'>
            {eyebrow}
          </p>
        ) : null}
        <div className='space-y-2'>
          <h1 className='text-3xl font-semibold tracking-tight text-balance sm:text-4xl'>
            {title}
          </h1>
          <p className='max-w-sm text-sm/6 text-muted-foreground'>{message}</p>
        </div>
        {hint ? (
          <p className='font-mono text-xs/relaxed text-muted-foreground normal-case'>
            {hint}
          </p>
        ) : null}
      </section>
      <div key='actions' className='flex flex-wrap items-center gap-2'>
        {actions}
      </div>
    </HomeClient>
  )
}
