import { labIdeas } from '@/lab/generated-manifest'
import { redirect } from 'next/navigation'

export default function LabPage() {
  const latestIdea = labIdeas[0]
  if (latestIdea === undefined) return null

  redirect(latestIdea.href)
}
