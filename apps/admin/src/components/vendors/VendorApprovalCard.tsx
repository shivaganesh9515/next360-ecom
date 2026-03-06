import { Check, X, Store, Mail, Phone, MapPin } from 'lucide-react'

interface VendorApprovalCardProps {
  vendor: any
  onApprove: (id: string) => void
  onReject: (id: string, reason: string) => void
  isProcessing: boolean
}

export function VendorApprovalCard({ vendor, onApprove, onReject, isProcessing }: VendorApprovalCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        
        {/* Vendor Info */}
        <div className="space-y-4 flex-1">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{vendor.storeName}</h3>
              <p className="text-sm text-gray-500">Applied by {vendor.user?.name}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-400" />
              {vendor.user?.email}
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-400" />
              {vendor.phone || 'N/A'}
            </div>
            <div className="flex items-start gap-2 sm:col-span-2">
              <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
              <span>{vendor.address}, {vendor.city}, {vendor.state} {vendor.pinCode}</span>
            </div>
          </div>

          {vendor.description && (
            <div className="pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-700 leading-relaxed">
                "{vendor.description}"
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-row md:flex-col gap-3 shrink-0">
          <button
            disabled={isProcessing}
            onClick={() => onApprove(vendor.id)}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 bg-green-50 text-green-700 hover:bg-green-100 font-medium rounded-xl transition-colors disabled:opacity-50"
          >
            <Check className="w-4 h-4" /> Approve
          </button>
          <button
            disabled={isProcessing}
            onClick={() => {
              const reason = window.prompt('Enter rejection reason:')
              if (reason) onReject(vendor.id, reason)
            }}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 bg-red-50 text-red-700 hover:bg-red-100 font-medium rounded-xl transition-colors disabled:opacity-50"
          >
            <X className="w-4 h-4" /> Reject
          </button>
        </div>

      </div>
    </div>
  )
}
