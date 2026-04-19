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
