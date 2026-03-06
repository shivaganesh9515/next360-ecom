'use client'

import { use, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
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

export default function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const queryClient = useQueryClient()

  const { data: postData, isLoading } = useQuery({
    queryKey: ['admin-blog', id],
    queryFn: () => adminService.getBlogPost(id) // Optional in backend maybe? But assuming it exists.
  })

  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema) as any as any
  })

  useEffect(() => {
    if (postData?.post) {
      reset(postData.post)
    }
  }, [postData, reset])

  const title = watch('title')
  const content = watch('content')

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('title', e.target.value)
  }

  const mutation = useMutation({
    mutationFn: (data: PostFormValues) => adminService.updateBlogPost(id, data),
    onSuccess: () => {
      toast.success('Post updated')
      queryClient.invalidateQueries({ queryKey: ['admin-blog'] })
      router.push('/content/blog')
    },
    onError: (err: any) => toast.error(err.message || 'Failed to update post')
  })

  if (isLoading) {
    return <div className="p-12 flex justify-center"><div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" /></div>
  }

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/content/blog" className="p-2 border border-border rounded-xl hover:bg-gray-50 text-gray-500 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-2xl font-display font-semibold text-gray-900 leading-none">Edit Blog Post</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit((d) => mutation.mutate(d as any))} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Post Title</label>
              <Input {...register('title')} onChange={handleTitleChange} className="text-lg font-medium" />
              {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
               <BlogEditor content={content || ''} onChange={(html) => setValue('content', html, { shouldValidate: true })} />
               {errors.content && <p className="text-xs text-red-500 mt-1">{errors.content.message}</p>}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b border-border pb-4">Publishing</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug</label>
              <Input {...register('slug')} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Short Excerpt</label>
              <textarea {...register('excerpt')} className="w-full h-24 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary/20 text-sm outline-none resize-none font-sans" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
              <Input {...register('imageUrl')} />
            </div>
            <div className="pt-4 mt-2 border-t border-border">
              <label className="flex items-center gap-3 cursor-pointer mb-6">
                <input type="checkbox" {...register('isPublished')} className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary" />
                <span className="text-sm font-medium text-gray-900">Publish immediately</span>
              </label>
              <Button type="submit" size="lg" className="w-full" isLoading={mutation.isPending}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
