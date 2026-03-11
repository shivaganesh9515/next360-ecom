"use client"

import React, { useState } from 'react'
import { MapPin, ChevronDown, Navigation, Search, X } from 'lucide-react'
import { useLocationStore } from '@/store/locationStore'
import { Drawer, Button, Input } from '@next360/ui'
import { motion, AnimatePresence } from 'framer-motion'

export default function LocationBar() {
  const { zoneName, isLocationSet, city, clearLocation, setFromGPS } = useLocationStore()
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  return (
    <>
      <div 
        onClick={() => setIsSheetOpen(true)}
        className="flex items-center gap-1.5 cursor-pointer group max-w-[200px] py-1.5 px-3 rounded-full hover:bg-cream/50 transition-colors"
      >
        <MapPin size={16} className="text-secondary shrink-0" fill="currentColor" fillOpacity={0.2} />
        <span className="text-sm font-bold text-text truncate">
          {city || 'Select Location'}
        </span>
        <ChevronDown size={14} className="text-muted group-hover:text-primary transition-colors shrink-0" />
      </div>

      <Drawer
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        title="Change Delivery Location"
      >
        <div className="p-6 space-y-8">
          {/* Current Location */}
          {isLocationSet && (
            <div className="bg-cream rounded-2xl p-4 border border-secondary/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted uppercase tracking-wider">Current Location</p>
                  <p className="font-bold text-text">{city}</p>
                </div>
              </div>
              <div className="text-secondary bg-secondary/10 rounded-full p-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
            </div>
          )}

          {/* GPS Option */}
          <button 
            onClick={async () => {
              await setFromGPS()
              setIsSheetOpen(false)
            }}
            className="w-full flex items-center gap-4 p-4 rounded-2xl border border-border hover:border-secondary hover:bg-secondary/5 transition-all group text-left"
          >
            <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <Navigation size={20} />
            </div>
            <div>
              <p className="font-bold text-text">Detect My Location</p>
              <p className="text-xs text-muted">Using GPS for better accuracy</p>
            </div>
          </button>

          <div className="flex items-center gap-3">
            <hr className="border-border flex-1" />
            <span className="text-[10px] text-muted font-bold uppercase tracking-widest">or</span>
            <hr className="border-border flex-1" />
          </div>

          {/* Manual Options */}
          <div className="space-y-4">
            <p className="text-sm font-bold text-text">Enter Pincode or Search City</p>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
              <input 
                placeholder="e.g. 500001 or Hyderabad"
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all font-medium"
              />
            </div>
          </div>

          <div className="pt-4">
            <Button 
              variant="outline" 
              fullWidth 
              onClick={() => {
                clearLocation()
                setIsSheetOpen(false)
              }}
              className="rounded-2xl h-14 border-red-100 text-red-500 hover:bg-red-50 hover:border-red-200"
            >
              Reset Location
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  )
}
