import { ProfileMeta } from './ProfileMeta'
import { SocialLinks } from './SocialLinks'

export default function HomePage() {
  return (
    <div className='grid w-full grid-cols-2 gap-x-6 self-start justify-self-stretch p-4 font-mono text-xs tracking-wider uppercase md:grid-cols-3 md:p-6'>
      <div className='flex flex-col gap-2 md:items-end'>
        <h1 className='text-foreground'>Tommy Chow</h1>
        <SocialLinks />
      </div>
      <div className='md:col-start-3'>
        <ProfileMeta />
      </div>
    </div>
  )
}
