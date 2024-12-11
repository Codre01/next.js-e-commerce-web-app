// components/products/ProductCard.tsx
import { Product } from '../types';
import { Edit2, Trash2, Star, Tag, Box } from 'lucide-react';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
}

export default function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">

        <img
          src={product.image_urls[0]}
          alt={product.title}
          className="w-full max-h-48 object-cover rounded-md mb-2"
        />
        {product.is_featured && (
          <span className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-full text-xs">
            Featured
          </span>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-dark-100 truncate">
            {product.title}
          </h3>
          <span className="text-primary font-bold">${product.price}</span>
        </div>

        <p className="text-dark-60 text-sm line-clamp-2">{product.description}</p>

        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center text-primary">
            <Star className="w-4 h-4 mr-1 fill-current" />
            {product.rating}
          </div>
          <div className="flex items-center text-dark-60">
            <Tag className="w-4 h-4 mr-1" />
            {product.category.title}
          </div>
          <div className="flex items-center text-dark-60">
            <Box className="w-4 h-4 mr-1" />
            {product.brand.title}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex -space-x-1">
            {product.color.map((color, index) => (
              <div
                key={index}
                className="w-6 h-6 rounded-full border-2 border-white"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <div className="flex space-x-1">
            {product.sizes.map((size) => (
              <span
                key={size}
                className="px-2 py-1 text-xs bg-dark-5 rounded-md text-dark-60"
              >
                {size}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-2 border-t border-dark-20">
          <button
            onClick={() => onEdit(product)}
            className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="p-2 text-red hover:bg-red/10 rounded-full transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}