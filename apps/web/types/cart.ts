import { Product } from './product';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedWeight: string;
}

export interface CartState {
  items: CartItem[];
  coupon: string | null;
  total: number;
}
