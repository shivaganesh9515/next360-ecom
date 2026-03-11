'use client'

import React, { useState, useEffect } from 'react'
import { 
  X, 
  MapPin, 
  Navigation, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ArrowRight, 
  Globe, 
  Building2, 
  Home
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Modal } from '@next360/ui/Modal'
import { Button } from '@next360/ui/Button'
import { Input } from '@next360/ui/Input'
import { Select } from '@next360/ui/Select'
import Link from 'next/link'
import { useLocationStore } from '../../store/locationStore'
import { api, getErrorMessage } from '../../services/api'
import { toast } from 'sonner'
import type { LocationResult } from '@next360/types/location'

export default function LocationPickerModal({ 
  isOpen = true, 
  onClose = () => {} 
}: { 
  isOpen?: boolean; 
  onClose?: () => void 
}) {
  const { setLocation, setManualSelectionPending } = useLocationStore()
  const [step, setStep] = useState<'options' | 'detecting' | 'pincode' | 'manual' | 'success' | 'unserviceable'>('options')
  const [pincode, setPincode] = useState('')
  const [loading, setLoading] = useState(false)
  
  const [states, setStates] = useState<any[]>([])
  const [districts, setDistricts] = useState<any[]>([])
  const [cities, setCities] = useState<any[]>([])
  
  const [selectedState, setSelectedState] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  
  const [detectionResult, setDetectionResult] = useState<LocationResult | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient && isOpen && step === 'options') {
      fetchStates()
    }
  }, [isOpen, isClient, step])

  // Cascade fetch for districts
  useEffect(() => {
    if (selectedState && isClient) {
      fetchDistricts(selectedState)
    } else {
      setDistricts([])
    }
  }, [selectedState, isClient])

  // Cascade fetch for cities
  useEffect(() => {
    if (selectedDistrict && isClient) {
      fetchCities(selectedDistrict)
    } else {
      setCities([])
    }
  }, [selectedDistrict, isClient])

  const fetchStates = async () => {
    try {
      const res = await api.get('/location/states')
      const data = res.data.data
      setStates(data)
      // Auto-select if only one state exists
      if (data.length === 1 && !selectedState) {
        setSelectedState(data[0].code)
      }
    } catch (err) {
      toast.error('Failed to load regions')
    }
  }

  const fetchDistricts = async (code: string) => {
    try {
      const res = await api.get(`/location/states/${code}/districts`)
      setDistricts(res.data.data)
    } catch (err) {
      toast.error('Failed to load districts')
    }
  }

  const fetchCities = async (id: string) => {
    try {
      const res = await api.get(`/location/districts/${id}/cities`)
      setCities(res.data.data)
    } catch (err) {
      toast.error('Failed to load cities')
    }
  }

  const handleStateChange = (code: string) => {
    setSelectedState(code)
    setSelectedDistrict('')
    setSelectedCity('')
  }

  const handleDistrictChange = (id: string) => {
    setSelectedDistrict(id)
    setSelectedCity('')
  }

  const processResult = (result: LocationResult) => {
    setDetectionResult(result)
    if (result.isServiceable) {
      setStep('success')
      setTimeout(() => {
        setLocation(result)
        setManualSelectionPending(false)
        onClose()
      }, 2000)
    } else {
      setStep('unserviceable')
    }
  }

  const handleGPSDetect = () => {
    setStep('detecting')
    if (!navigator.geolocation) {
      toast.error('Geolocation not supported')
      setStep('options')
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const res = await api.post('/location/detect', {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
          processResult(res.data.data)
        } catch (err) {
          toast.error(getErrorMessage(err))
          setStep('options')
        }
      },
      () => {
        toast.error('Location access denied')
        setStep('options')
      }
    )
  }

  const handlePincodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (pincode.length < 6) return
    setLoading(true)
    try {
      const res = await api.post('/location/check-pincode', { pincode })
      processResult(res.data.data)
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 300 } },
    exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.2 } }
  }

  if (!isClient) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showClose={true}
      size="lg"
      className="bg-primary/95 backdrop-blur-xl overflow-hidden border border-white/10 shadow-3xl [&_button]:text-white/70 hover:[&_button]:text-white"
    >
      <div className="relative min-h-[500px] flex flex-col items-center justify-center p-8 text-white font-sans">
        {/* Background Sparkles */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
           <div className="absolute top-10 left-10 w-20 h-20 bg-accent blur-[60px] rounded-full" />
           <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary blur-[80px] rounded-full" />
        </div>

        <AnimatePresence mode="wait">
          {step === 'options' && (
            <motion.div
              key="options"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-md text-center"
            >
              <div className="text-5xl mb-6">🌿</div>
              <h2 className="text-3xl font-display font-bold mb-2 text-white">Next360</h2>
              <p className="text-white/70 mb-10">Fresh from farms, delivered to your doorstep. Where are you located?</p>

              <div className="space-y-4">
                <Button
                  onClick={handleGPSDetect}
                  variant="secondary"
                  size="lg"
                  className="w-full h-16 text-lg rounded-2xl group"
                >
                  <Navigation className="mr-3 h-5 w-5 group-hover:animate-pulse" />
                  Use My Location
                </Button>

                <div className="flex items-center gap-4 py-4">
                  <div className="h-px bg-white/20 flex-1" />
                  <span className="text-xs uppercase tracking-widest text-white/40 font-semibold">Or Select Manually</span>
                  <div className="h-px bg-white/20 flex-1" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={() => setStep('manual')}
                    variant="outline"
                    className="h-14 border-white/20 hover:bg-white/10 rounded-2xl text-white"
                  >
                    Select City
                  </Button>
                  <Button
                    onClick={() => setStep('pincode')}
                    variant="outline"
                    className="h-14 border-white/20 hover:bg-white/10 rounded-2xl text-white"
                  >
                    Pincode
                  </Button>
                </div>

                <div className="pt-6">
                  <Link 
                    href="/" 
                    onClick={onClose}
                    className="text-xs font-bold text-white/40 hover:text-white uppercase tracking-[0.2em] transition-colors"
                  >
                    Return to Public Storefront
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'detecting' && (
            <motion.div
              key="detecting"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center gap-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 blur-xl rounded-full animate-ping" />
                <div className="relative h-20 w-20 bg-white/10 border border-white/30 rounded-full flex items-center justify-center">
                  <Loader2 className="h-10 w-10 animate-spin" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-display font-bold mb-2">Detecting Location...</h3>
                <p className="text-white/60">Finding the nearest zones for you</p>
              </div>
            </motion.div>
          )}

          {step === 'pincode' && (
            <motion.div
              key="pincode"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-sm"
            >
              <Button
                variant="ghost"
                onClick={() => setStep('options')}
                className="mb-6 hover:bg-white/10 text-white/60"
              >
                ← Back
              </Button>
              <h3 className="text-2xl font-display font-bold mb-6">Enter Pincode</h3>
              <form onSubmit={handlePincodeSubmit} className="space-y-6">
                <Input
                  autoFocus
                  placeholder="Enter 6-digit pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/30 h-16 text-2xl tracking-[0.5em] text-center rounded-2xl focus:border-white/50"
                  error={undefined}
                />
                <Button
                  type="submit"
                  variant="secondary"
                  size="lg"
                  className="w-full h-14 rounded-2xl"
                  disabled={pincode.length < 6 || loading}
                  isLoading={loading}
                >
                  Find My Zone
                </Button>
              </form>
            </motion.div>
          )}

          {step === 'manual' && (
            <motion.div
              key="manual"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-md space-y-6"
            >
              <Button
                variant="ghost"
                onClick={() => setStep('options')}
                className="mb-2 hover:bg-white/10 text-white/60"
              >
                ← Back
              </Button>
              <h3 className="text-2xl font-display font-bold">Select Region</h3>
              
              <div className="space-y-4">
                <Select
                  label="State"
                  variant="dark"
                  options={[
                    { label: 'Select State', value: '' },
                    ...states.map(s => ({ label: s.name, value: s.code }))
                  ]}
                  value={selectedState}
                  onChange={(e) => handleStateChange(e.target.value)}
                  className="bg-white/10 border-white/20"
                />
                <Select
                  label="District"
                  variant="dark"
                  options={[
                    { label: 'Select District', value: '' },
                    ...districts.map(d => ({ label: d.name, value: d.id }))
                  ]}
                  value={selectedDistrict}
                  onChange={(e) => handleDistrictChange(e.target.value)}
                  disabled={!selectedState}
                   className="bg-white/10 border-white/20"
                />
                <Select
                  label="City"
                  variant="dark"
                  options={[
                    { label: 'Select City', value: '' },
                    ...cities.map(c => ({ label: c.name, value: c.id }))
                  ]}
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  disabled={!selectedDistrict}
                   className="bg-white/10 border-white/20"
                />
              </div>

              <Button
                variant="secondary"
                size="lg"
                className="w-full h-14 rounded-2xl mt-4"
                disabled={!selectedCity || loading}
                isLoading={loading}
                onClick={async () => {
                   // Logic for manual selection settlement
                   const city = cities.find(c => c.id === selectedCity)
                   if (city) {
                      processResult({
                        city: city.name,
                        district: districts.find(d => d.id === selectedDistrict)?.name || '',
                        state: states.find(s => s.code === selectedState)?.name || '',
                        pincode: '',
                        isServiceable: true,
                        zoneId: city.zoneId || 'manual-1',
                        zoneName: city.name,
                        zoneType: 'HYPERLOCAL',
                        deliveryPromise: 'Next Day Delivery',
                        enabledModes: ['ORGANIC', 'NATURAL', 'ECO'],
                        defaultMode: 'ORGANIC'
                      } as LocationResult)
                   }
                }}
              >
                Continue
              </Button>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center text-center py-10"
            >
              <div className="h-24 w-24 bg-accent/20 rounded-full flex items-center justify-center mb-8 border border-accent/40 shadow-[0_0_50px_-12px_rgba(var(--accent-rgb),0.5)]">
                <CheckCircle2 className="h-12 w-12 text-accent" />
              </div>
              <h3 className="text-3xl font-display font-bold mb-3">Welcome to Next360!</h3>
              <p className="text-white/70 text-lg mb-2">We deliver to {detectionResult?.city}</p>
              <div className="bg-white/10 px-4 py-2 rounded-full text-sm font-medium border border-white/10">
                ⚡ {detectionResult?.deliveryPromise}
              </div>
            </motion.div>
          )}

          {step === 'unserviceable' && (
            <motion.div
              key="unserviceable"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-sm flex flex-col items-center text-center"
            >
              <div className="h-20 w-20 bg-red-500/20 rounded-full flex items-center justify-center mb-6 border border-red-500/40">
                <AlertCircle className="h-10 w-10 text-red-400" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-3">Not in your city yet</h3>
              <p className="text-white/60 mb-8">We're expanding fast! Leave your email and be the first to know when we launch in {selectedCity || detectionResult?.city || 'your area'}.</p>
              
              <div className="w-full space-y-3">
                <Input
                  placeholder="name@email.com"
                  className="bg-white/10 border-white/20 h-14 rounded-2xl"
                  error={undefined}
                />
                <Button variant="secondary" className="w-full h-14 rounded-2xl group">
                  Notify Me
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="ghost" onClick={() => setStep('options')} className="mt-4 opacity-50 hover:opacity-100 text-white">
                  Try another location
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Modal>
  )
}
