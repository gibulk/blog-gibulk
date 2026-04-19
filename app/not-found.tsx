import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Halaman Tidak Ditemukan</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Maaf, halaman yang Anda cari tidak tersedia.
      </p>
      <Link href="/">
        <Button>Kembali ke Beranda</Button>
      </Link>
    </div>
  )
}
