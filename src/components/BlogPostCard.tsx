import { Card } from '@/components/ui/card'
import type { BlogPost } from '@/lib/server-utils'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'

export default function BlogPostCard({ id, title, date }: BlogPost) {
  return (
    <Link href={`/blog/${id}`}>
      <Card className='border-border/50 hover:border-border bg-background hover:bg-muted/30 h-full p-4 transition-colors'>
        <div className='flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between'>
          <h3 className='text-card-foreground font-semibold'>{title}</h3>
          <time
            className='text-muted-foreground text-sm font-medium'
            dateTime={date.toISOString()}
          >
            {formatDate(date instanceof Date ? date : new Date(date), true)}
          </time>
        </div>
      </Card>
    </Link>
  )
}
