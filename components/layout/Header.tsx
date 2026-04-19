'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CATEGORIES } from '@/types'
import { Menu, X, Search } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const pathname = usePathname()
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/cari?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
      setMobileMenuOpen(false)
    }
  }

  const isActive = (path: string) => pathname === path

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-gray-950/95 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Gibulk
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${isActive('/') ? 'text-blue-600' : ''}`}
            >
              Beranda
            </Link>
            {CATEGORIES.slice(0, 3).map((cat) => (
              <Link
                key={cat.slug}
                href={`/topik/${cat.slug}`}
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${isActive(`/topik/${cat.slug}`) ? 'text-blue-600' : ''}`}
              >
                {cat.name}
              </Link>
            ))}
            <Link 
              href="/tentang" 
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${isActive('/tentang') ? 'text-blue-600' : ''}`}
            >
              Tentang
            </Link>
          </nav>

          <div className="hidden md:flex items-center">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Cari artikel..."
                className="w-64 pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t p-4 bg-white dark:bg-gray-950">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Cari artikel..."
                className="w-full pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
          <nav className="flex flex-col space-y-3">
            <Link 
              href="/" 
              className="text-sm font-medium py-1"
              onClick={() => setMobileMenuOpen(false)}
            >
              Beranda
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/topik/${cat.slug}`}
                className="text-sm font-medium py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
            <Link 
              href="/tentang" 
              className="text-sm font-medium py-1"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tentang
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
            }
