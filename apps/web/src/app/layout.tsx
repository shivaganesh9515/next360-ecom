import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'
import Providers from '@/components/Providers'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata = {
  title: {
    default: 'Next360 — Premium Organic Products',
    template: '%s | Next360',
  },
  description: 'Farm to your table, 100% certified organic products. Premium quality organic vegetables, fruits, and pantry staples delivered to your doorstep.',
  metadataBase: new URL('http://localhost:3000'),
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased text-slate-800 bg-white">
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:px-6 focus:py-3 focus:rounded-xl focus:shadow-2xl focus:text-primary focus:font-bold"
        >
          Skip to content
        </a>
        <Providers>
          <Navbar />
          <main id="main-content" className="min-h-screen">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </Providers>
      </body>
    </html>
  )
}
