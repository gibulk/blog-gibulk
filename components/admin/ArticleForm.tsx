'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Article, ArticleFormData, CATEGORIES } from '@/types'
import { createArticle, updateArticle, uploadImage } from '@/app/admin/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import RichTextEditor from './RichTextEditor'
import Image from 'next/image'
import toast from 'react-hot-toast'
import slugify from 'slugify'

interface ArticleFormProps {
  article?: Article
}

export default function ArticleForm({ article }: ArticleFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<ArticleFormData>({
    title: article?.title || '',
    slug: article?.slug || '',
    excerpt: article?.excerpt || '',
    content: article?.content || '',
    category: article?.category || 'Geopolitik',
    featured_image: article?.featured_image || '',
    status: article?.status || 'draft',
  })
  const [imageUploading, setImageUploading] = useState(false)

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: prev.slug || slugify(title, { lower: true, strict: true, locale: 'id' })
    }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Ukuran gambar maksimal 5MB')
      return
    }

    setImageUploading(true)
    try {
      const imageUrl = await uploadImage(file)
      setFormData(prev => ({ ...prev, featured_image: imageUrl }))
      toast.success('Gambar berhasil diupload')
    } catch (error) {
      toast.error('Gagal upload gambar')
    } finally {
      setImageUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (article) {
        await updateArticle(article.id, formData)
        toast.success('Artikel berhasil diupdate')
      } else {
        await createArticle(formData)
        toast.success('Artikel berhasil dibuat')
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Terjadi kesalahan')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">Judul Artikel</label>
        <Input
          value={formData.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Masukkan judul artikel"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Slug URL</label>
        <Input
          value={formData.slug}
          onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
          placeholder="slug-artikel-ini"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          URL: https://gibulk.vercel.app/artikel/{formData.slug || 'slug-artikel'}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Ringkasan</label>
        <Textarea
          value={formData.excerpt}
          onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
          placeholder="Ringkasan singkat artikel (150-160 karakter)"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Kategori</label>
        <Select 
          value={formData.category} 
          onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Pilih kategori" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat.slug} value={cat.name}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Gambar Utama</label>
        <div className="space-y-2">
          {formData.featured_image && (
            <div className="relative h-48 w-full max-w-md rounded-lg overflow-hidden">
              <Image
                src={formData.featured_image}
                alt="Featured"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, featured_image: '' }))}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
              >
                ✕
              </button>
            </div>
          )}
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={imageUploading}
          />
          {imageUploading && <p className="text-sm text-gray-500">Mengupload...</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Konten Artikel</label>
        <RichTextEditor
          content={formData.content}
          onChange={(content) => setFormData(prev => ({ ...prev, content }))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Status</label>
        <Select 
          value={formData.status} 
          onValueChange={(value: 'draft' | 'published') => 
            setFormData(prev => ({ ...prev, status: value }))
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Publish</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? 'Menyimpan...' : article ? 'Update Artikel' : 'Simpan Artikel'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Batal
        </Button>
      </div>
    </form>
  )
        }
