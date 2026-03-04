export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  category: string
  authorId: string
  thumbnail: string
  isPublished: boolean
  publishedAt?: string
  createdAt: string
}
