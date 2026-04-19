'use client'

import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { deleteArticle } from '@/app/admin/actions'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface DeleteButtonProps {
  id: string
  title: string
}

export default function DeleteButton({ id, title }: DeleteButtonProps) {
  const router = useRouter()

  const handleDelete = async () => {
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
    <Button variant="ghost" size="sm" onClick={handleDelete}>
      <Trash2 className="h-4 w-4 text-red-500" />
    </Button>
  )
}
