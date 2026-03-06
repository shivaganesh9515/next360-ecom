'use client'

import { useQuery } from '@tanstack/react-query'
import { adminService } from '../../../services/adminService'
import { use } from 'react'
import Link from 'next/link'
import { ArrowLeft, Mail, Phone, MapPin, CheckCircle, Clock } from 'lucide-react'
import { PayoutManager } from '../../../components/vendors/PayoutManager'
import { DataTable } from '@next360/ui/DataTable'

export default function VendorDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  const { data, isLoading } = useQuery({
    queryKey: ['admin-vendor', id],
    queryFn: () => adminService.getVendorById(id)
  })

  if (isLoading) {
    return (
      <div className="p-12 flex justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
    )
  }

  if (!data?.vendor) return <div>Vendor not found</div>
  const vendor = data.vendor

  const productColumns: any[] = [
    { accessorKey: 'name', header: 'Product' },
    { accessorKey: 'price', header: 'Price', cell: (row: any) => `₹${row.price}` },
    { accessorKey: 'stock', header: 'Stock' },
    { accessorKey: 'isPublished', header: 'Status', cell: (row: any) => row.isPublished ? 'Published' : 'Draft' },
  ]

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/vendors" className="p-2 border border-border rounded-xl hover:bg-gray-50 text-gray-500 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-2xl font-display font-semibold text-gray-900 leading-none">
            {vendor.storeName}
          </h2>
          <div className="flex items-center gap-2 mt-2">
            {vendor.status === 'ACTIVE' ? (
              <span className="flex items-center gap-1 text-xs font-semibold uppercase text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full">
                <CheckCircle className="w-3.5 h-3.5" /> Active
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs font-semibold uppercase text-yellow-700 bg-yellow-50 px-2.5 py-0.5 rounded-full">
                <Clock className="w-3.5 h-3.5" /> {vendor.status}
              </span>
            )}
            <span className="text-xs text-gray-500 px-2.5 py-0.5 rounded-full bg-gray-100 font-medium">
              {vendor.commissionRate}% Commission
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Info & Payouts */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-4 border-b border-gray-100">Contact & Legal</h3>
            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-400" />
                {vendor.user?.email}
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-400" />
                {vendor.phone || 'N/A'}
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                <span>{vendor.address}, {vendor.city}, {vendor.state} {vendor.pinCode}</span>
              </div>
            </div>
            
            {(vendor.gstNumber || vendor.panNumber) && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Tax Documents</h4>
                <div className="space-y-2 text-sm">
                  {vendor.gstNumber && <p><strong className="text-gray-900">GST:</strong> {vendor.gstNumber}</p>}
                  {vendor.panNumber && <p><strong className="text-gray-900">PAN:</strong> {vendor.panNumber}</p>}
                </div>
              </div>
            )}
          </div>

          <PayoutManager vendorId={vendor.id} pendingBalance={vendor.pendingBalance || 0} />
        </div>

        {/* Right Col: Products */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Vendor Products</h3>
              <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {vendor.products?.length || 0} items
              </span>
            </div>
            <DataTable 
              columns={productColumns}
              data={vendor.products || []}
              searchKey="name"
            />
          </div>
        </div>

      </div>
    </div>
  )
}
