'use server'

import { createAdminClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import slugify from 'slugify'
import { ArticleFormData } from '@/types'

export async function createArticle(formData: ArticleFormData) {
  const supabase = await createAdminClient()
  
  const slug = formData.slug || slugify(formData.title, { 
    lower: true, 
    strict: true,
    locale: 'id'
  })

  const { data, error } = await supabase
    .from('articles')
    .insert({
      title: formData.title,
      slug,
      excerpt: formData.excerpt,
      content: formData.content,
      category: formData.category,
      featured_image: formData.featured_image,
      status: formData.status,
      published_at: formData.status === 'published' ? new Date().toISOString() : null,
    } as any)
    .select()
    .single()

  if (error) {
    throw new Error(`Gagal membuat artikel: ${error.message}`)
  }

  revalidatePath('/')
  revalidatePath('/admin')
  
  if (formData.status === 'published') {
    revalidatePath(`/artikel/${slug}`)
  }

  redirect('/admin')
}

export async function updateArticle(id: string, formData: ArticleFormData) {
  const supabase = await createAdminClient()
  
  const slug = formData.slug || slugify(formData.title, { 
    lower: true, 
    strict: true,
    locale: 'id'
  })

  const { error } = await supabase
    .from('articles')
    .update({
      title: formData.title,
      slug,
      excerpt: formData.excerpt,
      content: formData.content,
      category: formData.category,
      featured_image: formData.featured_image,
      status: formData.status,
      published_at: formData.status === 'published' 
        ? new Date().toISOString() 
        : null,
    } as any)
    .eq('id', id)

  if (error) {
    throw new Error(`Gagal update artikel: ${error.message}`)
  }

  revalidatePath('/')
  revalidatePath('/admin')
  revalidatePath(`/artikel/${slug}`)

  redirect('/admin')
}

export async function deleteArticle(id: string) {
  const supabase = await createAdminClient()
  
  const { data: article } = await supabase
    .from('articles')
    .select('featured_image')
    .eq('id', id)
    .single()

  if (article?.featured_image) {
    const urlParts = article.featured_image.split('/')
    const fileName = urlParts[urlParts.length - 1]
    if (fileName) {
      await supabase.storage
        .from('article-images')
        .remove([fileName])
    }
  }

  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(`Gagal menghapus artikel: ${error.message}`)
  }

  revalidatePath('/')
  revalidatePath('/admin')

  redirect('/admin')
}

export async function uploadImage(file: File): Promise<string> {
  const supabase = await createAdminClient()
  
  const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '-')}`
  
  const { data, error } = await supabase.storage
    .from('article-images')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    throw new Error(`Gagal upload gambar: ${error.message}`)
  }

  const { data: { publicUrl } } = supabase.storage
    .from('article-images')
    .getPublicUrl(fileName)

  return publicUrl
}
