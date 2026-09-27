import { ProfileMeta } from './ProfileMeta'

export default function HomePage() {
  return (
    <div className='grid w-full grid-cols-2 gap-x-6 self-start justify-self-stretch p-4 font-mono text-xs tracking-wider uppercase md:grid-cols-3 md:p-6'>
      <h1 className='text-foreground'>Tommy Chow</h1>
      <div className='flex flex-col gap-4 md:col-start-3'>
        <ProfileMeta />
      </div>
    </div>
  )
}
