export const BASE_URL = process.env.SITE_URL ?? 'http://localhost:3000'

export const MOTION_EASING: [number, number, number, number] = [
  0.25, 0.46, 0.45, 0.94,
]

export const narrowPageContainerClassName =
  'mx-auto flex w-full max-w-md min-w-0 flex-col place-self-center px-6 py-16 md:px-0'
