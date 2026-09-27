import { ProfileMeta } from './ProfileMeta'
import { SocialLinks } from './SocialLinks'

export default function HomePage() {
  return (
    // Sits just above the wall's top edge, which the background draws at 32% of
    // the large viewport height; lvh keeps the two locked on mobile.
    <div className='absolute inset-x-0 top-[32lvh] grid -translate-y-full grid-cols-2 gap-x-6 px-4 pb-10 font-mono text-xs tracking-wider uppercase md:grid-cols-3 md:px-6'>
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
