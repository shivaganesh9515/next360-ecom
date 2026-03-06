import { Address } from '@next360/types'

export const MOCK_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    userId: 'user-001',
    name: 'Home',
    street: '123 MG Road',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560001',
    phone: '9876543210',
    type: 'HOME',
    isDefault: true,
  },
  {
    id: 'addr-2',
    userId: 'user-001',
    name: 'Office',
    street: '456 Tech Park',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560100',
    phone: '9876543211',
    type: 'OFFICE',
    isDefault: false,
  },
]

export const MOCK_PLACED_ORDER = {
  id: 'order-success-001',
  orderNumber: 'ORD-N360-SUCCESS',
  subtotal: 125000,
  total: 125000,
  expectedBy: 'March 15, 2026',
  items: [
    {
      id: 'item-1',
      productName: 'Organic Avocados',
      quantity: 2,
      selectedWeight: '500g',
      totalPrice: 45000
    },
    {
      id: 'item-2',
      productName: 'Fresh Strawberries',
      quantity: 1,
      selectedWeight: '250g',
      totalPrice: 80000
    }
  ]
}
