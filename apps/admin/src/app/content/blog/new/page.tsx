'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { adminService } from '../../../../services/adminService'
import { toast } from 'sonner'
import { BlogEditor } from '../../../../components/content/BlogEditor'
import { Input } from '@next360/ui/Input'
import { Button } from '@next360/ui/Button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const postSchema = z.object({
  title: z.string().min(5, 'Title is too short'),
  slug: z.string().min(3),
  excerpt: z.string().max(200).optional(),
  content: z.string().min(10, 'Content is required'),
  imageUrl: z.string().url().optional().or(z.literal('')),
  isPublished: z.boolean().default(true)
})

type PostFormValues = z.infer<typeof postSchema>

export default function NewBlogPostPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema) as any as any,
    defaultValues: { isPublished: true, content: '' }
  })

  // Auto-generate slug
  const title = watch('title')
  const content = watch('content')

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setValue('title', newTitle)
    if (!watch('slug')) { // Only auto-gen if slug is empty or we choose to always override. For now simple
      setValue('slug', newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''))
    }
  }

  const onSubmit = async (data: PostFormValues) => {
    setIsSubmitting(true)
    try {
      await adminService.createBlogPost(data)
      toast.success('Post created')
      router.push('/content/blog')
    } catch (err: any) {
      toast.error(err.message || 'Failed to create post')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/content/blog" className="p-2 border border-border rounded-xl hover:bg-gray-50 text-gray-500 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-2xl font-display font-semibold text-gray-900 leading-none">New Blog Post</h2>
          <p className="text-muted text-sm mt-1">Compose and publish an article.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit((data) => onSubmit(data as any))} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Post Title</label>
              <Input 
                {...register('title')} 
                onChange={handleTitleChange}
                placeholder="The Future of Organic Farming"
                className="text-lg font-medium"
              />
              {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
            </div>
            
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
               <BlogEditor content={content} onChange={(html) => setValue('content', html, { shouldValidate: true })} />
               {errors.content && <p className="text-xs text-red-500 mt-1">{errors.content.message}</p>}
            </div>
          </div>
        </div>

        {/* Settings Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b border-border pb-4">Publishing</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug</label>
              <Input {...register('slug')} placeholder="the-future-of-organic-farming" />
              {errors.slug && <p className="text-xs text-red-500 mt-1">{errors.slug.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Short Excerpt</label>
              <textarea 
                {...register('excerpt')}
                className="w-full h-24 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none resize-none font-sans"
                placeholder="A brief summary for previews..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
              <Input {...register('imageUrl')} placeholder="https://..." />
            </div>

            <div className="pt-4 mt-2 border-t border-border">
              <label className="flex items-center gap-3 cursor-pointer mb-6">
                <input type="checkbox" {...register('isPublished')} className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary" />
                <span className="text-sm font-medium text-gray-900">Publish immediately</span>
              </label>
              
              <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting}>
                Save & Publish
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
