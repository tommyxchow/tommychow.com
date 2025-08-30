import type { BlogPost } from '@/lib/server-utils'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import { Card } from '@/components/ui/card'

export default function BlogPostCard({ id, title, date }: BlogPost) {
  return (
    <Link href={`/blog/${id}`}>
      <Card className='h-full p-4 transition-colors border-border/50 hover:border-border bg-background hover:bg-muted/30'>
        <div className='flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between'>
          <h3 className='font-semibold text-card-foreground'>{title}</h3>
          <time
            className='text-sm text-muted-foreground font-medium'
            dateTime={date.toISOString()}
          >
            {formatDate(date instanceof Date ? date : new Date(date), true)}
          </time>
        </div>
      </Card>
    </Link>
  )
}
