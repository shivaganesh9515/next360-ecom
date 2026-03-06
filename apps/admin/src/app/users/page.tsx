'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { adminService } from '../../services/adminService'
import { DataTable } from '@next360/ui/DataTable'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Search, Shield, Ban, Coins, Edit } from 'lucide-react'
import { Button } from '@next360/ui/Button'
import { Input } from '@next360/ui/Input'
import { toast } from 'sonner'
import { User } from '@next360/types'

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const queryClient = useQueryClient()
  
  // Modals state
  const [roleModalUser, setRoleModalUser] = useState<User | null>(null)
  const [seedsModalUser, setSeedsModalUser] = useState<User | null>(null)

  const { data, isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: () => adminService.getUsers()
  })

  // Mutations
  const updateRoleMutation = useMutation({
    mutationFn: ({ id, role }: { id: string, role: string }) => adminService.updateUserRole(id, role),
    onSuccess: () => {
      toast.success('User role updated')
      queryClient.invalidateQueries({ queryKey: ['admin-users'] })
      setRoleModalUser(null)
    }
  })

  const banMutation = useMutation({
    mutationFn: ({ id, isBanned }: { id: string, isBanned: boolean }) => 
      isBanned ? adminService.unbanUser(id) : adminService.banUser(id),
    onSuccess: () => {
      toast.success('User status updated')
      queryClient.invalidateQueries({ queryKey: ['admin-users'] })
    }
  })

  const seedsMutation = useMutation({
    mutationFn: ({ id, amount, reason }: { id: string, amount: number, reason: string }) => 
      adminService.awardSeeds(id, { amount, reason }),
    onSuccess: () => {
      toast.success('Seeds awarded successfully')
      queryClient.invalidateQueries({ queryKey: ['admin-users'] })
      setSeedsModalUser(null)
    }
  })

  const columns: any[] = [
    {
      accessorKey: 'name',
      header: 'User',
      cell: (row: any) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
            {row.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900">{row.name}</span>
            <span className="text-xs text-muted">{row.email}</span>
          </div>
        </div>
      )
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: (row: any) => {
        const role = row.role
        const colors: Record<string, string> = {
          CUSTOMER: 'bg-gray-100 text-gray-600',
          VENDOR: 'bg-blue-100 text-blue-700',
          ADMIN: 'bg-purple-100 text-purple-700'
        }
        return (
          <span className={`px-2.5 py-1 text-xs font-bold rounded-full uppercase tracking-widest ${colors[role] || colors.CUSTOMER}`}>
            {role}
          </span>
        )
      }
    },
    {
      accessorKey: 'seedsBalance',
      header: 'Seeds balance',
      cell: (row: any) => (
        <div className="flex items-center gap-1.5 font-medium text-green-700">
          <Coins className="w-4 h-4" />
          {row.seedsBalance || 0}
        </div>
      )
    },
    {
      accessorKey: 'createdAt',
      header: 'Joined',
      cell: (row: any) => <span className="text-sm text-gray-600">{format(new Date(row.createdAt), 'MMM d, yyyy')}</span>
    },
    {
      id: 'actions',
      header: '',
      cell: (row: any) => {
        const user = row.original
        const isBanned = user.status === 'BANNED'
        return (
          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => setRoleModalUser(user)}
              className="p-2 text-gray-400 hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
              title="Change Role"
            >
              <Shield className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setSeedsModalUser(user)}
              className="p-2 text-gray-400 hover:text-green-600 transition-colors rounded-lg hover:bg-green-50"
              title="Award Seeds"
            >
              <Coins className="w-4 h-4" />
            </button>
            <button 
              onClick={() => {
                if (window.confirm(`Are you sure you want to ${isBanned ? 'unban' : 'ban'} this user?`)) {
                  banMutation.mutate({ id: user.id, isBanned })
                }
              }}
              className={`p-2 transition-colors rounded-lg ${isBanned ? 'text-red-500 bg-red-50 hover:bg-red-100' : 'text-gray-400 hover:text-red-600 hover:bg-red-50'}`}
              title={isBanned ? 'Unban User' : 'Ban User'}
            >
              <Ban className="w-4 h-4" />
            </button>
          </div>
        )
      }
    }
  ]

  const users = data?.users || []
  const filteredUsers = users.filter((u: any) => 
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="mb-8">
        <h2 className="text-2xl font-display font-semibold text-gray-900">Users</h2>
        <p className="text-muted text-sm mt-1">Manage customers, vendors, and administrators.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50">
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input 
              placeholder="Search by name or email..." 
              className="pl-9 bg-white"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="bg-white">Export CSV</Button>
        </div>

        {isLoading ? (
          <div className="p-12 pl-6 flex justify-center">
            <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          </div>
        ) : (
          <DataTable 
            columns={columns} 
            data={filteredUsers} 
            searchKey=""
          />
        )}
      </div>

      {/* Role Modal */}
      {roleModalUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-gray-900">Change User Role</h3>
              <p className="text-sm text-gray-500 mt-1">Update privileges for {roleModalUser.email}</p>
            </div>
            <div className="p-6 space-y-4">
              <select 
                id="role-select" 
                defaultValue={roleModalUser.role}
                className="w-full h-11 px-4 border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              >
                <option value="CUSTOMER">Customer</option>
                <option value="VENDOR">Vendor</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            <div className="p-4 border-t border-border flex justify-end gap-3 bg-gray-50">
              <Button variant="outline" onClick={() => setRoleModalUser(null)}>Cancel</Button>
              <Button 
                onClick={() => {
                  const el = document.getElementById('role-select') as HTMLSelectElement
                  updateRoleMutation.mutate({ id: roleModalUser.id, role: el.value })
                }}
                isLoading={updateRoleMutation.isPending}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Seeds Modal */}
      {seedsModalUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-gray-900">Award Next360 Seeds</h3>
              <p className="text-sm text-gray-500 mt-1">Add loyalty points to {seedsModalUser.email}</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <Input type="number" id="seeds-amount" placeholder="e.g. 500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                <Input id="seeds-reason" placeholder="e.g. Referral bonus" />
              </div>
            </div>
            <div className="p-4 border-t border-border flex justify-end gap-3 bg-gray-50">
              <Button variant="outline" onClick={() => setSeedsModalUser(null)}>Cancel</Button>
              <Button 
                onClick={() => {
                  const amt = document.getElementById('seeds-amount') as HTMLInputElement
                  const rsn = document.getElementById('seeds-reason') as HTMLInputElement
                  seedsMutation.mutate({ 
                    id: seedsModalUser.id, 
                    amount: parseInt(amt.value, 10), 
                    reason: rsn.value 
                  })
                }}
                isLoading={seedsMutation.isPending}
              >
                Award Seeds
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
