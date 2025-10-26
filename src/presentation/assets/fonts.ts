import { Geist, Geist_Mono } from 'next/font/google'

export const fontBody = Geist({
  subsets: ['latin'],
  variable: '--font-body'
})

export const fontTitle = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-title'
})
