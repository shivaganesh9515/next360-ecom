'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { adminService } from '../../services/adminService'
import { DataTable } from '@next360/ui/DataTable'
import { ColumnDef } from '@tanstack/react-table'
import { toast } from 'sonner'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { VendorApprovalCard } from '../../components/vendors/VendorApprovalCard'

export default function VendorsPage() {
  const [activeTab, setActiveTab] = useState<'ACTIVE' | 'PENDING'>('ACTIVE')
  const queryClient = useQueryClient()

  // Fetch based on active tab
  const { data, isLoading } = useQuery({
    queryKey: ['admin-vendors', activeTab],
    queryFn: () => adminService.getVendors(activeTab)
  })

  const approveMutation = useMutation({
    mutationFn: (id: string) => adminService.approveVendor(id),
    onSuccess: () => {
      toast.success('Vendor approved')
      queryClient.invalidateQueries({ queryKey: ['admin-vendors'] })
    }
  })

  const rejectMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string, reason: string }) => adminService.rejectVendor(id, reason),
    onSuccess: () => {
      toast.success('Vendor application rejected')
      queryClient.invalidateQueries({ queryKey: ['admin-vendors'] })
    }
  })

  const columns: any[] = [
    {
      accessorKey: 'storeName',
      header: 'Store Name',
      cell: (row: any) => <span className="font-semibold text-text">{row.storeName}</span>
    },
    {
      accessorKey: 'user.name',
      header: 'Owner',
      cell: (row: any) => <span className="text-muted">{row.user?.name}</span>
    },
    {
      accessorKey: 'user.email',
      header: 'Email',
      cell: (row: any) => <span className="text-sm text-muted">{row.user?.email}</span>
    },
    {
      header: 'Sales / Comm.',
      cell: (row: any) => (
        <div className="flex flex-col">
          <span className="text-sm font-medium">₹0</span>
          <span className="text-xs text-muted">{row.commissionRate}% comm.</span>
        </div>
      )
    },
    {
      id: 'actions',
      cell: (row: any) => (
        <Link 
          href={`/vendors/${row.id}`}
          className="p-2 text-muted hover:text-primary transition-colors flex justify-end"
        >
          <ChevronRight className="w-5 h-5" />
        </Link>
      )
    }
  ]

  const vendors = data?.vendors || []

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="mb-8">
        <h2 className="text-2xl font-display font-semibold text-text">Vendors</h2>
        <p className="text-muted text-sm mt-1">Manage vendor accounts, applications, and payouts.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border mb-6">
        <button
          onClick={() => setActiveTab('ACTIVE')}
          className={`pb-4 px-6 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'ACTIVE' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-muted hover:text-text'
          }`}
        >
          Active Vendors
        </button>
        <button
          onClick={() => setActiveTab('PENDING')}
          className={`pb-4 px-6 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'PENDING' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-muted hover:text-text'
          }`}
        >
          Pending Applications
        </button>
      </div>

      {isLoading ? (
        <div className="p-12 flex justify-center">
          <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        </div>
      ) : activeTab === 'ACTIVE' ? (
        <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
          <DataTable 
            columns={columns} 
            data={vendors} 
            searchKey="storeName"
          />
        </div>
      ) : (
        <div className="space-y-4">
          {vendors.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center">
              <p className="text-muted">No pending vendor applications at the moment.</p>
            </div>
          ) : (
            vendors.map((vendor: any) => (
              <VendorApprovalCard 
                key={vendor.id} 
                vendor={vendor}
                onApprove={(id) => approveMutation.mutate(id)}
                onReject={(id, reason) => rejectMutation.mutate({ id, reason })}
                isProcessing={approveMutation.isPending || rejectMutation.isPending}
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}
