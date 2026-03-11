import type { ReactNode } from 'react'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import { Providers } from './providers'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata = {
  title: {
    default: 'Next360 Admin — Command Center',
    template: '%s | Next360 Admin',
  },
  description: 'Next360 Administrative Curation & Governance Hub',
}

export default function RootAdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${dmSans.variable} ${playfair.variable} font-sans bg-[#050505] text-white antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
