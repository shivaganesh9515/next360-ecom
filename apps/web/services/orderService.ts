import api from './api';
import { Order } from '@/types/order';
import { CartItem } from '@/types/cart';
import { Address } from '@/types/user';
import { PaymentMethod } from '@/types/order';

interface PlaceOrderPayload {
  items: CartItem[];
  address: Address;
  paymentMethod: PaymentMethod;
  couponCode?: string;
}

export const orderService = {
  async getOrders(): Promise<Order[]> {
    const { data } = await api.get('/orders');
    return data;
  },

  async getOrder(id: string): Promise<Order> {
    const { data } = await api.get(`/orders/${id}`);
    return data;
  },

  async placeOrder(payload: PlaceOrderPayload): Promise<Order> {
    const { data } = await api.post('/orders', payload);
    return data;
  },
};
