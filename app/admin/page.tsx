import LogoutButton from '@/components/admin/LogoutButton'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PlusCircle, LogOut, Pencil, Eye } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  const supabase = await createAdminClient()
  
  const { data: articles, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error:', error)
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Dashboard Admin</h1>
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          <p>Error: {error.message}</p>
          <p className="mt-2 text-sm">
            Pastikan tabel "articles" sudah dibuat di Supabase.
          </p>
        </div>
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
          <LogoutButton />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard label="Total Artikel" value={stats.total} />
        <StatCard label="Dipublikasikan" value={stats.published} color="green" />
        <StatCard label="Draft" value={stats.draft} color="yellow" />
      </div>

      <div className="bg-white dark:bg-gray-950 border rounded-lg">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Daftar Artikel</h2>
        </div>
        
        {articles && articles.length > 0 ? (
          <div className="divide-y">
            {articles.map((article) => (
              <div key={article.id} className="p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-900">
                <div className="flex-1">
                  <Link 
                    href={`/artikel/${article.slug}`} 
                    target="_blank"
                    className="font-medium hover:underline"
                  >
                    {article.title}
                  </Link>
                  <div className="flex items-center gap-3 mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      article.status === 'published' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {article.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                    <span className="text-xs text-gray-500">{article.category}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/artikel/${article.slug}`} target="_blank">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href={`/admin/artikel/${article.id}/edit`}>
                    <Button variant="ghost" size="sm">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-gray-500">
            <p>Belum ada artikel.</p>
            <Link href="/admin/artikel/baru">
              <Button className="mt-4">
                <PlusCircle className="mr-2 h-4 w-4" />
                Buat Artikel Pertama
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ label, value, color = 'default' }: { label: string; value: number; color?: string }) {
  const colorClass = {
    green: 'text-green-600',
    yellow: 'text-yellow-600',
    default: ''
  }[color]

  return (
    <div className="bg-white dark:bg-gray-950 border rounded-lg p-6">
      <h3 className="text-sm font-medium text-gray-500">{label}</h3>
      <p className={`text-3xl font-bold ${colorClass}`}>{value}</p>
    </div>
  )
}

function LogoutButton() {
  return (
    <form action="/api/auth/logout" method="post">
      <Button variant="outline" type="submit">
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </form>
  )
}
