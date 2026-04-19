import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { path, slug } = await request.json()
    
    if (path) {
      revalidatePath(path)
    }
    
    if (slug) {
      revalidatePath(`/artikel/${slug}`)
    }
    
    revalidatePath('/')
    
    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to revalidate' }, { status: 500 })
  }
}
