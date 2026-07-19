import { type Route } from 'next'

export interface LabEntry {
  slug: string
  title: string
  createdAt: string
  description?: string
  href: Route
}
