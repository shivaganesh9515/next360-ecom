import { DM_Sans, Playfair_Display } from 'next/font/google'
import Providers from '@/components/Providers'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import Navbar from '@/components/layout/Navbar'
import { LocationGate } from '@/components/location/LocationGate'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'
import './globals.css'

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-dm-sans',
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
});

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
    <html lang="en">
      <body className={`${dmSans.variable} ${playfair.variable} font-sans bg-cream text-text antialiased`}>
        <Providers>
          <div className="relative flex flex-col min-h-screen">
            <AnnouncementBar />
            <Navbar />
            <LocationGate>
              <main id="main-content" className="flex-1">
                {children}
              </main>
            </LocationGate>
            <Footer />
            <CartDrawer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
