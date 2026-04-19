'use client'

import { Article } from '@/types'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'
import { deleteArticle } from '@/app/admin/actions'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

interface ArticleTableProps {
  articles: Article[]
}

export default function ArticleTable({ articles }: ArticleTableProps) {
  const router = useRouter()

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Yakin hapus artikel "${title}"?`)) return
    
    try {
      await deleteArticle(id)
      toast.success('Artikel dihapus')
      router.refresh()
    } catch (error) {
      toast.error('Gagal menghapus artikel')
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="border-b bg-gray-50 dark:bg-gray-900">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Judul</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kategori</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {articles.map((article) => (
            <tr key={article.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
              <td className="px-6 py-4">
                <Link href={`/artikel/${article.slug}`} className="font-medium hover:underline">
                  {article.title}
                </Link>
              </td>
              <td className="px-6 py-4 text-sm">{article.category}</td>
              <td className="px-6 py-4 text-sm">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  article.status === 'published' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {article.status === 'published' ? 'Published' : 'Draft'}
                </span>
              </td>
              <td className="px-6 py-4 text-sm">
                {format(new Date(article.created_at), 'dd MMM yyyy', { locale: id })}
              </td>
              <td className="px-6 py-4 text-right space-x-2">
                <Link href={`/admin/artikel/${article.id}/edit`}>
                  <Button variant="ghost" size="sm">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleDelete(article.id, article.title)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
