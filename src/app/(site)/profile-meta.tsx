import { StatSheetList } from '@/components/meta-row'
import Link from 'next/link'
import { type ReactNode } from 'react'
import { SocialLinks } from './social-links'

const profileRows: { label: string; value: ReactNode }[] = [
  { label: 'work', value: 'Software engineer, Tesla' },
  { label: 'from', value: 'Flushing, NY' },
  { label: 'now', value: 'Cupertino, CA' },
  { label: 'school', value: 'University at Buffalo' },
  {
    label: 'lab',
    value: (
      <Link className='underline underline-offset-4' href='/lab'>
        web experiments
      </Link>
    ),
  },
  { label: 'links', value: <SocialLinks /> },
]

export function ProfileMeta() {
  return <StatSheetList rows={profileRows} />
}
