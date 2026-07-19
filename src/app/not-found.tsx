import { StatusPage, StatusPageLink } from '@/components/status-page'

export default function NotFound() {
  return (
    <StatusPage
      title='Page not found'
      actions={<StatusPageLink href='/'>Go home</StatusPageLink>}
    />
  )
}
