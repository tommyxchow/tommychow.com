import { StatSheetList } from '@/components/MetaRow'
import { type ReactNode } from 'react'
import { SocialLinks } from './SocialLinks'

const profileRows: { label: string; value: ReactNode }[] = [
  {
    label: 'name',
    value: <h1>Tommy Chow</h1>,
  },
  { label: 'work', value: 'Software engineer, Tesla' },
  { label: 'school', value: 'University at Buffalo' },
  { label: 'from', value: 'Flushing, NY' },
  { label: 'now', value: 'Cupertino, CA' },
  { label: 'links', value: <SocialLinks /> },
]

export function ProfileMeta() {
  return <StatSheetList rows={profileRows} />
}
