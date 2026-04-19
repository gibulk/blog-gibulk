import { createClient } from '@/lib/supabase/server'
import ArticleCard from '@/components/artikel/ArticleCard'
import { notFound } from 'next/navigation'

export const revalidate = 3600 // Revalidate setiap 1 jam

export default async function HomePage() {
  const supabase = await createClient()
  
  const { data: articles, error } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(12)

  if (error) {
    console.error('Error fetching articles:', error)
    return <div>Terjadi kesalahan saat memuat artikel.</div>
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Selamat Datang di Gibulk</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Belum ada artikel yang dipublikasikan. Kunjungi lagi nanti!
        </p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Gibulk
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Analisis Geopolitik, Geografi, dan Ekonomi Global
        </p>
      </header>

      <section>
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Artikel Terbaru</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </div>
  )
}
