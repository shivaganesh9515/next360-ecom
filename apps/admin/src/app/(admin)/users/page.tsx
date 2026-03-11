'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, UserPlus, ShieldCheck, Store, User as UserIcon, ChevronRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

const mockUsers = [
  { id: 'USR-001', name: 'Arjun Sharma', email: 'arjun@example.com', role: 'USER', zone: 'Banjara Hills', orders: 14, joined: '3 months ago' },
  { id: 'USR-002', name: 'Priya Nair', email: 'priya@example.com', role: 'VENDOR', zone: 'Madhapur', orders: 0, joined: '1 month ago' },
  { id: 'USR-003', name: 'Rajesh Kumar', email: 'rajesh@example.com', role: 'USER', zone: 'Gachibowli', orders: 7, joined: '6 months ago' },
  { id: 'USR-004', name: 'Sneha Reddy', email: 'sneha@admin.com', role: 'ADMIN', zone: 'Jubilee Hills', orders: 0, joined: '1 year ago' },
  { id: 'USR-005', name: 'Vikram Rao', email: 'vikram@example.com', role: 'USER', zone: 'Kondapur', orders: 3, joined: '2 months ago' },
  { id: 'USR-006', name: 'Ananya Patel', email: 'ananya@farms.com', role: 'VENDOR', zone: 'Hitech City', orders: 0, joined: '5 months ago' },
]

const roleConfig: Record<string, { color: string; icon: React.ElementType }> = {
  ADMIN: { color: 'bg-secondary/10 text-secondary border-secondary/20', icon: ShieldCheck },
  VENDOR: { color: 'bg-blue-500/10 text-blue-400 border-blue-500/20', icon: Store },
  USER: { color: 'bg-white/5 text-white/50 border-white/10', icon: UserIcon },
}

export default function AdminUsersPage() {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')

  const filtered = mockUsers.filter(u =>
    (roleFilter === 'All' || u.role === roleFilter) &&
    (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="space-y-12 font-sans pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">User Registry</span>
          </div>
          <h1 className="text-6xl font-display font-black text-white tracking-tighter leading-none">Users</h1>
        </div>
        <button className="bg-secondary text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-secondary/20 hover:scale-105 transition-all flex items-center gap-2">
          <UserPlus className="w-4 h-4" strokeWidth={3} /> Invite User
        </button>
      </div>

      {/* Role Filters */}
      <div className="flex gap-3">
        {['All', 'USER', 'VENDOR', 'ADMIN'].map(r => (
          <button
            key={r}
            onClick={() => setRoleFilter(r)}
            className={cn(
              "px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border",
              roleFilter === r
                ? "bg-secondary text-white border-secondary shadow-lg shadow-secondary/20"
                : "bg-white/5 border-white/5 text-white/50 hover:text-white"
            )}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-lg group">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-secondary transition-colors" />
        <input
          placeholder="Search by name or email..."
          className="w-full bg-white/5 border border-white/5 rounded-2xl h-14 pl-14 pr-6 text-sm text-white focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all font-medium"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((user, i) => {
          const cfg = roleConfig[user.role]
          const RoleIcon = cfg.icon
          return (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card className="bg-[#111] border-white/5 p-8 group hover:border-white/10 transition-all cursor-pointer">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-xl font-display font-black text-secondary">
                    {user.name.charAt(0)}
                  </div>
                  <span className={cn("inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest py-1.5 px-3 rounded-xl border", cfg.color)}>
                    <RoleIcon className="w-3 h-3" />
                    {user.role}
                  </span>
                </div>
                <h3 className="text-lg font-display font-black text-white group-hover:text-secondary transition-colors">{user.name}</h3>
                <p className="text-xs text-white/40 font-medium mt-1">{user.email}</p>
                <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center">
                  <div>
                    <p className="text-[10px] text-white/30 uppercase font-black tracking-widest">{user.zone}</p>
                    {user.role === 'USER' && (
                      <p className="text-[10px] text-white/20 mt-1 font-medium">{user.orders} orders</p>
                    )}
                  </div>
                  <p className="text-[10px] text-white/20 font-medium">Joined {user.joined}</p>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
