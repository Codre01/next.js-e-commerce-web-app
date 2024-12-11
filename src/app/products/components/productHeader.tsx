// components/products/ProductHeader.tsx
import { Plus, Search, Filter } from 'lucide-react';

interface ProductHeaderProps {
  onAddProduct: () => void;
  onSearch: (query: string) => void;
}

export default function ProductHeader({ onAddProduct, onSearch }: ProductHeaderProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-50 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border border-dark-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button className="flex items-center px-4 py-2 text-dark-60 bg-dark-5 rounded-lg hover:bg-dark-20 transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
          <button
            onClick={onAddProduct}
            className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primarydark transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}