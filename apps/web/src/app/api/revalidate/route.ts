import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag, revalidatePath } from 'next/cache'

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  const tag = req.nextUrl.searchParams.get('tag')
  const path = req.nextUrl.searchParams.get('path')

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  if (tag) {
    revalidateTag(tag as string)
    return NextResponse.json({ revalidated: true, tag, now: Date.now() })
  }

  if (path) {
    revalidatePath(path as string, 'page')
    return NextResponse.json({ revalidated: true, path, now: Date.now() })
  }

  return NextResponse.json({ message: 'Missing tag or path' }, { status: 400 })
}
