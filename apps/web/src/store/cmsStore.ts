import { create } from 'zustand'

export const useCmsStore = create((set) => ({
  // --- CMS Banners State ---
  heroBanner: {
    title: "Harvest Season is LIVE!",
    subtitle: "Direct from the farmers of Sanga Reddy Hub.",
    ctaText: "Explore Fresh Arrivals",
    active: true,
    theme: "ORGANIC"
  },
  flashSaleBanner: {
    text: "Flash Checkout: Get 15% off first 100 NPOP verified rice batches.",
    active: true,
    accentColor: "#2D5016"
  },

  // --- Best Selling & Approvals State ---
  // Using simple product IDs corresponding to the dummy product catalog
  bestSellingIds: [1, 2, 5], 

  promotionRequests: [
    // Pre-populating a dummy pending request for demo purposes
    { id: 'REQ-1001', productId: 8, productName: 'Wild Forest Honey', vendorName: 'Heritage Organic Collective', status: 'pending', date: 'Oct 24, 2024' }
  ],

  // --- Admin CMS Actions ---
  updateHeroBanner: (data) => set((state) => ({ heroBanner: { ...state.heroBanner, ...data } })),
  updateFlashSaleBanner: (data) => set((state) => ({ flashSaleBanner: { ...state.flashSaleBanner, ...data } })),
  
  // --- Vendor Actions ---
  requestPromotion: (requestData) => set((state) => ({
    promotionRequests: [
        ...state.promotionRequests, 
        { 
            ...requestData, 
            id: `REQ-${Math.floor(Math.random() * 10000)}`, 
            status: 'pending', 
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) 
        }
    ]
  })),

  // --- Admin Approval Actions ---
  approvePromotion: (requestId) => set((state) => {
    const request = state.promotionRequests.find(r => r.id === requestId);
    if (!request) return state;

    return {
      promotionRequests: state.promotionRequests.map(r => 
        r.id === requestId ? { ...r, status: 'approved' } : r
      ),
      // Automatically add to Best Sellers if approved
      bestSellingIds: state.bestSellingIds.includes(request.productId) 
        ? state.bestSellingIds 
        : [request.productId, ...state.bestSellingIds]
    };
  }),
  
  rejectPromotion: (requestId) => set((state) => ({
    promotionRequests: state.promotionRequests.map(r => 
      r.id === requestId ? { ...r, status: 'rejected' } : r
    )
  })),

  removeFromBestSelling: (productId) => set((state) => ({
    bestSellingIds: state.bestSellingIds.filter(id => id !== productId)
  }))
}))
