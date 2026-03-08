'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { adminService } from '../../../services/adminService'
import Link from 'next/link'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { Button } from '@next360/ui/Button'
import { DataTable } from '@next360/ui/DataTable'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { toast } from 'sonner'

export default function BlogListPage() {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['admin-blog'],
    queryFn: () => adminService.getBlogPosts()
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminService.deleteBlogPost(id),
    onSuccess: () => {
      toast.success('Blog post deleted')
      queryClient.invalidateQueries({ queryKey: ['admin-blog'] })
    }
  })

  const columns: any[] = [
    {
      accessorKey: 'title',
      header: 'Title',
      cell: (row: any) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-border/40 overflow-hidden shrink-0 border border-border">
            {row.imageUrl && (
              <img src={row.imageUrl} alt={row.title} className="w-full h-full object-cover" />
            )}
          </div>
          <div>
            <p className="font-semibold text-text leading-tight">{row.title}</p>
            <p className="text-xs text-muted mt-0.5">/{row.slug}</p>
          </div>
        </div>
      )
    },
    {
      accessorKey: 'author.name',
      header: 'Author',
      cell: (row: any) => <span className="text-sm text-muted">{row.author?.name || 'Admin'}</span>
    },
    {
      accessorKey: 'createdAt',
      header: 'Published Date',
      cell: (row: any) => <span className="text-sm text-muted">{format(new Date(row.createdAt), 'MMM d, yyyy')}</span>
    },
    {
      accessorKey: 'isPublished',
      header: 'Status',
      cell: (row: any) => (
        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
          row.isPublished ? 'bg-green-100 text-green-800' : 'bg-border/40 text-text'
        }`}>
          {row.isPublished ? 'PUBLISHED' : 'DRAFT'}
        </span>
      )
    },
    {
      id: 'actions',
      cell: (row: any) => (
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link 
            href={`/content/blog/${row.id}`}
            className="p-2 text-muted hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <button 
            onClick={() => {
              if(window.confirm('Delete this post?')) deleteMutation.mutate(row.id)
            }}
            className="p-2 text-muted hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ]

  const posts = data?.posts || []

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-display font-semibold text-text">Blog Posts</h2>
          <p className="text-muted text-sm mt-1">Manage articles, guides, and news.</p>
        </div>
        <Link href="/content/blog/new">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Post
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex justify-center">
            <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          </div>
        ) : (
          <DataTable 
            columns={columns} 
            data={posts} 
            searchKey="title"
          />
        )}
      </div>
    </div>
  )
}
