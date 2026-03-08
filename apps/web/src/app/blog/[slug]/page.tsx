import { redirect } from 'next/navigation'
import { MAIN_SITE_URL } from '@/lib/externalLinks'

export default function BlogDetailRedirect() {
  redirect(MAIN_SITE_URL || '/')
}
