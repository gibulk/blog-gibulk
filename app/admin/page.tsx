import { createAdminClient } from '@/lib/supabase/server'
import Link from 'next/link'
import ArticleTable from '@/components/admin/ArticleTable'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  const supabase = await createAdminClient()
  
  const { data: articles, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching articles:', error)
    return <div>Terjadi kesalahan saat memuat data.</div>
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
        <Link href="/admin/artikel/baru">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Artikel Baru
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-950 border rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Artikel</h3>
          <p className="text-3xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-white dark:bg-gray-950 border rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Dipublikasikan</h3>
          <p className="text-3xl font-bold text-green-600">{stats.published}</p>
        </div>
        <div className="bg-white dark:bg-gray-950 border rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Draft</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats.draft}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-950 border rounded-lg">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Daftar Artikel</h2>
        </div>
        <ArticleTable articles={articles || []} />
      </div>
    </div>
  )
}
