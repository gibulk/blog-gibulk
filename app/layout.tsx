import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Gibulk - Analisis Geopolitik & Ekonomi Global',
    template: '%s | Gibulk'
  },
  description: 'Blog pribadi Gibulk, penulis dan analis geopolitik, geografi, dan ekonomi global. Artikel harian tentang politik internasional, tren ekonomi, dan analisis pasar.',
  keywords: ['geopolitik', 'ekonomi global', 'analisis pasar', 'geografi', 'politik internasional', 'Gibulk'],
  authors: [{ name: 'Gibulk' }],
  creator: 'Gibulk',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://gibulk.vercel.app',
    siteName: 'Gibulk',
    title: 'Gibulk - Analisis Geopolitik & Ekonomi Global',
    description: 'Blog pribadi Gibulk, penulis dan analis geopolitik, geografi, dan ekonomi global.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gibulk - Analisis Geopolitik & Ekonomi Global',
    description: 'Blog pribadi Gibulk, penulis dan analis geopolitik, geografi, dan ekonomi global.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
