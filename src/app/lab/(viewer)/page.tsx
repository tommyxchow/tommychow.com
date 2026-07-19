import { labEntries } from '@/lab/generated-manifest'
import { redirect } from 'next/navigation'

export default function LabPage() {
  const latestEntry = labEntries[0]
  if (latestEntry === undefined) return null

  redirect(latestEntry.href)
}
