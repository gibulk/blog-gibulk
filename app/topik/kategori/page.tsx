import { createClient } from '@/lib/supabase/server'
import ArticleCard from '@/components/artikel/ArticleCard'
import { CATEGORIES } from '@/types'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

export const revalidate = 3600

interface Props {
  params: Promise<{ kategori: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kategori } = await params
  const category = CATEGORIES.find(c => c.slug === kategori)
  
  if (!category) {
    return { title: 'Kategori Tidak Ditemukan' }
  }

  return {
    title: `Artikel ${category.name}`,
    description: category.description,
  }
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ kategori: cat.slug }))
}

export default async function CategoryPage({ params }: Props) {
  const { kategori } = await params
  const supabase = await createClient()
  
  const category = CATEGORIES.find(c => c.slug === kategori)
  
  if (!category) {
    notFound()
  }

  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .eq('category', category.name)
    .order('published_at', { ascending: false })

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
        <p className="text-gray-600 dark:text-gray-400">{category.description}</p>
      </header>

      {articles && articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-12">
          Belum ada artikel dalam kategori ini.
        </p>
      )}
    </div>
  )
}
