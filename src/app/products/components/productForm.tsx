// components/products/ProductForm.tsx
import { useState, useEffect } from 'react';
import { X, Upload, Plus, Minus } from 'lucide-react';
import { Product } from '../types';
import Session from '@/app/helpers/Session';
import catchError from '@/app/helpers/catchError';
import { Category } from '@/app/category/types';
import { Brand } from '@/app/brands/types';

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (productData: Partial<Product>) => void;
  editProduct?: Product | null;
}

export default function ProductForm({ isOpen, onClose, onSubmit, editProduct }: ProductFormProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<Partial<Category>[]>([]);
  const [brands, setBrands] = useState<Partial<Brand>[]>([]);

  const [formData, setFormData] = useState<Partial<Product>>({
    title: '',
    price: 0,
    description: '',
    is_featured: false,
    clothes_type: 'unisex',
    rating: 1.0,
    category: undefined,
    brand: undefined,
    color: [],
    sizes: [],
    image_urls: [],
  });

  const fetchCategories = async () => {
    const accessToken = Session.getCookie('x-access-token');
    const [error, result] = await catchError(
      fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/products/categories/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        }
      })
    );

    if (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
      return;
    }

    if (!result?.ok) {
      console.error("Failed to fetch categories:", result?.statusText);
      setLoading(false);
      return;
    }

    const data = await result.json();
    setCategories(data || []);
    setLoading(false);
  };
  const fetchBrands = async () => {
    const accessToken = Session.getCookie('x-access-token');
    const [error, result] = await catchError(
      fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/products/brands/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        }
      })
    );

    if (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
      return;
    }

    if (!result?.ok) {
      console.error("Failed to fetch categories:", result?.statusText);
      setLoading(false);
      return;
    }

    const data = await result.json();
    setBrands(data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (editProduct) {
      setFormData(editProduct);
    }
  }, [editProduct]);
  useEffect(() => {
    fetchBrands();
    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleColorAdd = () => {
    setFormData((prev: any) => ({
      ...prev,
      color: [...(prev.color || []), '#000000']
    }));
  };

  const handleColorChange = (index: number, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      color: prev.color?.map((c: any, i: any) => i === index ? value : c)
    }));
  };

  const handleColorRemove = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      color: prev.color?.filter((_: any, i: any) => i !== index)
    }));
  };

  const handleSizeAdd = () => {
    setFormData((prev: any) => ({
      ...prev,
      sizes: [...(prev.sizes || []), '']
    }));
  };

  const handleSizeChange = (index: number, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      sizes: prev.sizes?.map((s: any, i: any) => i === index ? value : s)
    }));
  };

  const handleSizeRemove = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      sizes: prev.sizes?.filter((_: any, i: any) => i !== index)
    }));
  };

  const handleImageAdd = () => {
    setFormData((prev: any) => ({
      ...prev,
      image_urls: [...(prev.image_urls || []), '']
    }));
  };

  const handleImageChange = (index: number, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      image_urls: prev.image_urls?.map((url: string, i: number) => i === index ? value : url)
    }));
  };

  const handleImageRemove = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      image_urls: prev.image_urls?.filter((_: string, i: number) => i !== index)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-dark-20 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-dark-100">
            {editProduct ? 'Edit Product' : 'Create New Product'}
          </h2>
          <button
            onClick={onClose}
            className="text-dark-60 hover:text-dark-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          onSubmit(formData);
        }} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-dark-100">Basic Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-60 mb-1">
                  Product Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-2 border border-dark-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-60 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  step="0.01"
                  className="w-full p-2 border border-dark-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-60 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full p-2 border border-dark-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>
          </div>

          {/* Categories and Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-dark-100">Classification</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-60 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category?.id}
                  onChange={handleChange}
                  className="w-full p-2 border border-dark-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-60 mb-1">
                  Brand
                </label>
                <select
                  name="brand"
                  value={formData.brand?.id}
                  onChange={handleChange}
                  className="w-full p-2 border border-dark-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                >
                  <option value="">Select Brand</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Colors */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-dark-100">Colors</h3>
              <button
                type="button"
                onClick={handleColorAdd}
                className="text-primary hover:text-primarydark"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              {formData.color?.map((color: string, index: number) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => handleColorChange(index, e.target.value)}
                    className="w-8 h-8 rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleColorRemove(index)}
                    className="text-red hover:text-red/80"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-dark-100">Sizes</h3>
              <button
                type="button"
                onClick={handleSizeAdd}
                className="text-primary hover:text-primarydark"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              {formData.sizes?.map((size: string, index: number) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={size}
                    onChange={(e) => handleSizeChange(index, e.target.value)}
                    className="w-20 p-2 border border-dark-20 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleSizeRemove(index)}
                    className="text-red hover:text-red/80"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-dark-100">Images</h3>
              <button
                type="button"
                onClick={handleImageAdd}
                className="text-primary hover:text-primarydark"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              {formData.image_urls?.map((url: string, index: number) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    placeholder="Image URL"
                    className="flex-1 p-2 border border-dark-20 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleImageRemove(index)}
                    className="text-red hover:text-red/80"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-dark-100">Additional Options</h3>

            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="is_featured"
                  checked={formData.is_featured}
                  onChange={handleCheckbox}
                  className="w-4 h-4 text-primary rounded focus:ring-primary"
                />
                <span className="text-dark-60">Featured Product</span>
              </label>

              <div>
                <label className="block text-sm font-medium text-dark-60 mb-1">
                  Clothes Type
                </label>
                <select
                  name="clothes_type"
                  value={formData.clothes_type}
                  onChange={handleChange}
                  className="w-full p-2 border border-dark-20 rounded-lg"
                >
                  <option value="unisex">Unisex</option>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="kids">Kids</option>
                </select>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-dark-20">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-dark-60 bg-dark-5 rounded-lg hover:bg-dark-20"
            >
              Cancel
            </button>
            

            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primarydark"
            >
              {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                {editProduct ? 'Updating Product' : 'Creating Product'}
              </div>
            ) : (  
              <span>{editProduct ? 'Update Product' : 'Create Product'}</span>
            )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}