import { BlogPost } from '@next360/types'

export const MOCK_BLOG_CATEGORIES = [
  { label: 'All', count: 12 },
  { label: 'Recipes', count: 5 },
  { label: 'Health', count: 3 },
  { label: 'Farm Stories', count: 4 },
]

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'The Benefits of Eating Seasonal Organic Produce',
    slug: 'benefits-seasonal-organic-produce',
    excerpt: 'Discover why eating what the earth provides each season is better for your health and the environment.',
    content: 'Lorem ipsum dolor sit amet...',
    thumbnail: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
    category: 'Health',
    authorId: 'admin-1',
    isPublished: true,
    publishedAt: '2024-08-01T00:00:00Z',
    createdAt: '2024-08-01T00:00:00Z',
    readTime: '5 min read',
  },
  {
    id: 'post-2',
    title: '5 Easy Farm-to-Table Recipes for Summer',
    slug: '5-easy-farm-to-table-recipes',
    excerpt: 'Bring the freshness of the farm to your kitchen with these simple and delicious organic recipes.',
    content: 'Lorem ipsum dolor sit amet...',
    thumbnail: 'https://images.unsplash.com/photo-1466633364583-260a0f02122b?w=800',
    category: 'Recipes',
    authorId: 'admin-1',
    isPublished: true,
    publishedAt: '2024-08-05T00:00:00Z',
    createdAt: '2024-08-05T00:00:00Z',
    readTime: '8 min read',
  }
]
