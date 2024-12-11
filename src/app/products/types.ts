// types/product.ts
export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    is_featured: boolean;
    clothes_type: string;
    rating: number;
    category: {
      id: number;
      title: string;
      image_url: string;
    };
    brand: {
      id: number;
      title: string;
      image_url: string;
    };
    color: string[];
    sizes: string[];
    image_urls: string[];
    created_at: string;
  }