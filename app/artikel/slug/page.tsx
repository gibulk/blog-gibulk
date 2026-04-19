export const dynamic = 'force-dynamic'
export const revalidate = 0

import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import ArticleContent from '@/components/artikel/ArticleContent'
import CategoryBadge from '@/components/artikel/CategoryBadge'
import Image from 'next/image'
import { Metadata } from 'next'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  
  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!article) {
    return {
      title: 'Artikel Tidak Ditemukan',
      description: 'Artikel yang Anda cari tidak tersedia.'
    }
  }

  return {
    title: article.title,
    description: article.excerpt || article.content?.substring(0, 160),
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()
  
  const { data: article, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error || !article) {
    notFound()
  }

  const publishDate = article.published_at 
    ? new Date(article.published_at) 
    : new Date(article.created_at)

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="mb-8">
        <div className="mb-4">
          <CategoryBadge category={article.category} />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{article.title}</h1>
        
        {article.excerpt && (
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
            {article.excerpt}
          </p>
        )}
        
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-500 border-b pb-4">
          <span>Oleh Gibulk</span>
          <span className="mx-2">•</span>
          <time dateTime={publishDate.toISOString()}>
            {format(publishDate, 'dd MMMM yyyy', { locale: id })}
          </time>
        </div>
      </header>

      {article.featured_image && (
        <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
          <Image
            src={article.featured_image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <ArticleContent content={article.content || ''} />
    </article>
  )
}
