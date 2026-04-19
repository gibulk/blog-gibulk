'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Toaster } from 'react-hot-toast'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('admin_logged_in') === 'true'
    
    if (pathname !== '/admin/login' && !isLoggedIn) {
      router.replace('/admin/login')
    } else if (pathname === '/admin/login' && isLoggedIn) {
      router.replace('/admin')
    }
    
    setChecking(false)
  }, [pathname, router])

  if (checking && pathname !== '/admin/login') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 mx-auto mb-4" />
          <p className="text-gray-500">Memeriksa session...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Toaster position="top-right" />
      {children}
    </>
  )
}
