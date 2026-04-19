import { createClient } from '@/lib/supabase/server'
import ArticleCard from '@/components/artikel/ArticleCard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pencarian Artikel',
  description: 'Cari artikel di blog Gibulk',
}

interface Props {
  searchParams: Promise<{ q: string }>
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams
  const supabase = await createClient()
  
  let articles: any[] = []
  
  if (q) {
    const { data } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .or(`title.ilike.%${q}%,content.ilike.%${q}%,excerpt.ilike.%${q}%`)
      .order('published_at', { ascending: false })
    
    articles = data || []
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Hasil Pencarian</h1>
        {q && (
          <p className="text-gray-600 dark:text-gray-400">
            Mencari: "{q}" ({articles.length} hasil)
          </p>
        )}
      </header>

      {q && articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : q ? (
        <p className="text-gray-500 text-center py-12">
          Tidak ada artikel yang cocok dengan "{q}".
        </p>
      ) : (
        <p className="text-gray-500 text-center py-12">
          Masukkan kata kunci untuk mencari artikel.
        </p>
      )}
    </div>
  )
}
