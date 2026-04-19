import Link from 'next/link'
import Image from 'next/image'
import { Article } from '@/types'
import CategoryBadge from './CategoryBadge'
import { formatDistanceToNow } from 'date-fns'
import { id } from 'date-fns/locale'

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const publishedDate = article.published_at 
    ? new Date(article.published_at) 
    : new Date(article.created_at)

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm hover:shadow-md transition-shadow">
      {article.featured_image && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={article.featured_image}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3">
          <CategoryBadge category={article.category} />
        </div>
        
        <Link href={`/artikel/${article.slug}`} className="group-hover:underline">
          <h3 className="text-xl font-bold mb-2 line-clamp-2">{article.title}</h3>
        </Link>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
          {article.excerpt || article.content?.substring(0, 150) + '...'}
        </p>
        
        <div className="mt-auto flex items-center text-xs text-gray-500 dark:text-gray-500">
          <time dateTime={publishedDate.toISOString()}>
            {formatDistanceToNow(publishedDate, { addSuffix: true, locale: id })}
          </time>
          <span className="mx-2">•</span>
          <span>{article.view_count || 0} views</span>
        </div>
      </div>
    </article>
  )
}
