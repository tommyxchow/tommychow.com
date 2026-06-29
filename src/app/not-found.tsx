'use client'

import { StatusPage } from '@/components/StatusPage'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <StatusPage
      eyebrow='404'
      title='Page not found'
      message="The page you're looking for doesn't exist."
      actions={
        <Button
          render={<Link href='/' />}
          nativeButton={false}
          variant='outline'
        >
          Go home
        </Button>
      }
    />
  )
}
