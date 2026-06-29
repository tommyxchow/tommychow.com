import { type ReactNode } from 'react'
import { SocialLinks } from './SocialLinks'

const DOT_LEADER_LENGTH = 512
const DOTS = '.'.repeat(DOT_LEADER_LENGTH)

function DotLeader() {
  return (
    <span
      aria-hidden='true'
      className='min-w-0 overflow-hidden whitespace-nowrap text-muted-foreground/45'
    >
      {DOTS}
    </span>
  )
}

interface MetaRowProps {
  label: string
  value: ReactNode
}

function MetaRow({ label, value }: MetaRowProps) {
  return (
    <div className='grid grid-cols-[auto_1fr_auto] items-center gap-x-2'>
      <dt className='text-foreground'>{label}</dt>
      <DotLeader />
      <dd className='text-muted-foreground'>{value}</dd>
    </div>
  )
}

const profileRows: { label: string; value: ReactNode }[] = [
  {
    label: 'name',
    value: <h1 className='font-inherit text-inherit'>Tommy Chow</h1>,
  },
  { label: 'work', value: 'Software engineer, Tesla' },
  { label: 'school', value: 'University at Buffalo' },
  { label: 'from', value: 'Flushing, NY' },
  { label: 'now', value: 'Cupertino, CA' },
  { label: 'links', value: <SocialLinks /> },
]

export function ProfileMeta() {
  return (
    <dl className='flex flex-col gap-1.5 font-mono text-xs leading-none uppercase'>
      {profileRows.map(({ label, value }) => (
        <MetaRow key={label} label={label} value={value} />
      ))}
    </dl>
  )
}
