import React from 'react'
import { Badge, Button } from '@next360/ui'
import { Address } from '@next360/types'
import { MapPin } from 'lucide-react'

interface AddressCardProps {
  address: Address
  onEdit: (address: Address) => void
  onDelete: (id: string) => void
  onSetDefault: (id: string) => void
}

export default function AddressCard({ address, onEdit, onDelete, onSetDefault }: AddressCardProps) {
  return (
    <div className={`bg-white rounded-2xl border-2 p-5 relative transition-all ${
      address.isDefault ? 'border-primary shadow-md shadow-primary/5' : 'border-slate-100 shadow-sm'
    }`}>
      {address.isDefault && (
        <Badge variant="active" size="sm" className="absolute top-4 right-4 font-bold">
          Default
        </Badge>
      )}

      <MapPin className="text-primary mb-3" size={24} />

      <h3 className="font-bold text-slate-900 mb-1 leading-tight">{address.name}</h3>
      <p className="text-xs font-medium text-slate-500 mb-2">📞 {address.phone}</p>
      
      <p className="text-sm font-medium text-slate-700 leading-snug break-words">
        {address.street}
        <br />
        {address.city}, {address.state} {address.pincode}
      </p>
      
      {address.landmark && (
        <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">
          Landmark: {address.landmark}
        </p>
      )}

      <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-slate-100">
        <Button variant="ghost" className="text-xs font-bold px-3 py-1.5 h-auto text-slate-600 hover:bg-slate-50" onClick={() => onEdit(address)}>
          Edit
        </Button>
        <Button variant="ghost" className="text-xs font-bold px-3 py-1.5 h-auto text-red-500 hover:bg-red-50" onClick={() => onDelete(address.id)}>
          Delete
        </Button>
        {!address.isDefault && (
          <Button variant="outline" className="text-xs font-bold px-3 py-1.5 h-auto border-secondary text-secondary hover:bg-secondary/5 ml-auto" onClick={() => onSetDefault(address.id)}>
            Set as Default
          </Button>
        )}
      </div>
    </div>
  )
}
