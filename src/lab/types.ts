import { type Route } from 'next'

export interface LabVariation {
  slug: string
  title: string
  createdAt: string
  notes?: string
  href: Route
}

export interface LabIdea {
  slug: string
  title: string
  description?: string
  href: Route
  variations: readonly LabVariation[]
}
