import { StatusPage, StatusPageLink } from '@/components/StatusPage'

export default function NotFound() {
  return (
    <StatusPage
      title='Page not found'
      actions={<StatusPageLink href='/'>Go home</StatusPageLink>}
    />
  )
}
