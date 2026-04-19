import { createAdminClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PlusCircle, LogOut } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  const supabase = await createAdminClient()
  
  const { data: articles, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching articles:', error)
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Dashboard Admin</h1>
        <p className="text-red-500">Error: {error.message}</p>
        <p className="text-gray-600 mt-4">
          Pastikan tabel &quot;articles&quot; sudah dibuat di Supabase.
        </p>
      </div>
    )
  }

  const stats = {
    total: articles?.length || 0,
    published: articles?.filter(a => a.status === 'published').length || 0,
    draft: articles?.filter(a => a.status === 'draft').length || 0,
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Dashboard Admin</h1>
        <div className="flex gap-2">
          <Link href="/admin/artikel/baru">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Artikel Baru
            </Button>
          </Link>
          <form action="/api/auth/logout" method="post">
            <Button variant="outline" type="submit">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-950 border rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Artikel</h3>
          <p className="text-3xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-white dark:bg-gray-950 border rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-500">Dipublikasikan</h3>
          <p className="text-3xl font-bold text-green-600">{stats.published}</p>
        </div>
        <div className="bg-white dark:bg-gray-950 border rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-500">Draft</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats.draft}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-950 border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Artikel Terbaru</h2>
        {articles && articles.length > 0 ? (
          <div className="space-y-2">
            {articles.slice(0, 10).map((article) => (
              <div key={article.id} className="flex justify-between items-center border-b py-2">
                <div>
                  <Link href={`/artikel/${article.slug}`} className="font-medium hover:underline">
                    {article.title}
                  </Link>
                  <span className={`ml-2 text-xs px-2 py-1 rounded ${
                    article.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {article.status}
                  </span>
                </div>
                <Link href={`/admin/artikel/${article.id}/edit`}>
                  <Button variant="ghost" size="sm">Edit</Button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Belum ada artikel.</p>
        )}
      </div>
    </div>
  )
}
