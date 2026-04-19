export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      articles: {
        Row: {
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
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt?: string | null
          content?: string | null
          category?: string
          featured_image?: string | null
          status?: 'draft' | 'published'
          view_count?: number
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string | null
          content?: string | null
          category?: string
          featured_image?: string | null
          status?: 'draft' | 'published'
          view_count?: number
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}
