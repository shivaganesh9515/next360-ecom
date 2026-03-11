import type { PlatformMode } from '@next360/types/location'
import type { RythuBatch, StorefrontData } from '@next360/types/cms'
import { api } from './api'
import { mockRythuBatches, mockStorefrontData } from '@next360/utils'

export const storefrontService = {
  async getStorefrontData(zoneId: string, mode: PlatformMode): Promise<StorefrontData> {
    try {
      const { data } = await api.get('/storefront', { params: { zoneId, mode } })
      return data.data ?? data
    } catch {
      return {
        ...mockStorefrontData,
        banners: mockStorefrontData.banners.filter((banner) => !banner.mode || banner.mode === mode),
        marqueeItems: mockStorefrontData.marqueeItems.filter((item) => !item.mode || item.mode === mode),
        sections: mockStorefrontData.sections.filter((section) => !section.mode || section.mode === mode),
        testimonials: mockStorefrontData.testimonials.filter((item) => !item.mode || item.mode === mode),
      }
    }
  },

  async getRythuBatches(zoneId: string): Promise<RythuBatch[]> {
    try {
      const { data } = await api.get('/storefront/rythu-batches', { params: { zoneId } })
      return data.data ?? data
    } catch {
      return mockRythuBatches.filter((batch) => batch.zoneId === zoneId)
    }
  },
}
