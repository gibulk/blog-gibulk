import Link from 'next/link'
import { CATEGORIES } from '@/types'

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Gibulk
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Analisis geopolitik, geografi, dan ekonomi global. 
              Artikel harian untuk pemahaman dunia yang lebih baik.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Kategori</h4>
            <ul className="space-y-2 text-sm">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link 
                    href={`/topik/${cat.slug}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Tautan</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="/tentang"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
                >
                  Tentang Gibulk
                </Link>
              </li>
              <li>
                <Link 
                  href="/sitemap.xml"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
                >
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Gibulk. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}
