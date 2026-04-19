import { CATEGORIES } from '@/types'
import Link from 'next/link'

interface CategoryBadgeProps {
  category: string
}

export default function CategoryBadge({ category }: CategoryBadgeProps) {
  const cat = CATEGORIES.find(c => c.name === category)
  
  return (
    <Link 
      href={`/topik/${cat?.slug || category.toLowerCase()}`}
      className="inline-block text-xs font-medium px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
    >
      {category}
    </Link>
  )
}
