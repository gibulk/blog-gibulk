export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  
  // Debug: tampilkan slug yang diakses
  console.log('SLUG:', slug)
  
  const supabase = await createClient()
  
  const { data: article, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single()

  // Debug: tampilkan error jika ada
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">Error Debug</h1>
        <p className="mt-4"><strong>Slug:</strong> {slug}</p>
        <p className="mt-2"><strong>Error:</strong> {error.message}</p>
        <p className="mt-2"><strong>Code:</strong> {error.code}</p>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Artikel Tidak Ditemukan</h1>
        <p className="mt-4"><strong>Slug:</strong> {slug}</p>
        <p className="mt-2">Data tidak ditemukan di database.</p>
      </div>
    )
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-500 mb-4">Slug: {article.slug}</p>
      <p className="text-gray-500 mb-4">Status: {article.status}</p>
      <div className="prose prose-lg">
        <div dangerouslySetInnerHTML={{ __html: article.content || '' }} />
      </div>
    </article>
  )
}
  
