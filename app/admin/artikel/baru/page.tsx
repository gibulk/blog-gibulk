import ArticleForm from '@/components/admin/ArticleForm'

export default function NewArticlePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Artikel Baru</h1>
      <ArticleForm />
    </div>
  )
}
