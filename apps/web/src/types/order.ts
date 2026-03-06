import { CartItem } from './cart';
import { Address } from './user';

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'cod';

export interface Order {
  id: string;
  items: CartItem[];
  address: Address;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  placedAt: string;
  expectedDelivery: string;
  total: number;
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  couponCode: string | null;
}
