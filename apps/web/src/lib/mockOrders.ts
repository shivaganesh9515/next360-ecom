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
