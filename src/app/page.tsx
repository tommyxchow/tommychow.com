import { ProfileMeta } from './ProfileMeta'

export default function HomePage() {
  return (
    <div className='flex flex-col items-center gap-6 px-6 text-center'>
      <h1 className='text-lg font-medium tracking-tight text-foreground'>
        Tommy Chow
      </h1>
      <ProfileMeta />
    </div>
  )
}
