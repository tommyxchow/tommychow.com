const details = [
  'Software engineer at Tesla',
  'Based in Cupertino, CA',
  'From Flushing, NY',
  'University at Buffalo',
]

export function ProfileMeta() {
  return (
    <ul className='flex flex-col text-muted-foreground pointer-coarse:gap-2'>
      {details.map((detail) => (
        <li key={detail}>{detail}</li>
      ))}
    </ul>
  )
}
