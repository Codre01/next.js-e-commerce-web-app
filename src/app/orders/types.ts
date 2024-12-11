export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  is_featured: boolean;
  clothes_type: string;
  rating: number;
  color: string[];
  sizes: string[];
  image_urls: string[];
  created_at: string;
  category: number;
  brand: number;
}

export interface OrderItem {
  id: number;
  quantity: number;
  price: string;
  size: string;
  color: string;
  product: Product;
}

export interface Address {
  id: number;
  is_default: boolean;
  address: string;
  phone: string;
  address_type: string;
  user_id: number;
}

export interface Order {
  id: number;
  total_amount: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_status: 'pending' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
  items: OrderItem[];
  address: Address;
}