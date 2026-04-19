export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  category: string
  featured_image: string | null
  status: 'draft' | 'published'
  view_count: number
  created_at: string
  updated_at: string
  published_at: string | null
}

export interface Category {
  name: string
  slug: string
  description: string
}

export const CATEGORIES: Category[] = [
  { name: 'Geopolitik', slug: 'geopolitik', description: 'Analisis politik global dan hubungan internasional' },
  { name: 'Geografi', slug: 'geografi', description: 'Studi tentang bentang alam, iklim, dan demografi' },
  { name: 'Ekonomi Global', slug: 'ekonomi-global', description: 'Analisis pasar, perdagangan, dan kebijakan ekonomi' },
  { name: 'Analisis Pasar', slug: 'analisis-pasar', description: 'Tren pasar dan proyeksi ekonomi' },
]

export interface ArticleFormData {
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  featured_image: string
  status: 'draft' | 'published'
}
