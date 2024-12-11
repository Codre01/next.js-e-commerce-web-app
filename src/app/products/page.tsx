"use client";

import { useState, useEffect } from 'react';
import Layout from '../dashboard/components/layout';
import ProductHeader from './components/productHeader';
import ProductGrid from './components/productGrid';
import { Product } from './types';
import Session from '../helpers/Session';
import catchError from '../helpers/catchError';
import ProductForm from './components/productForm';
import { Loader } from 'lucide-react';

const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>();

    const fetchProducts = async () => {
        const accessToken: string = Session.getCookie('x-access-token');
        const [error, result] = await catchError(
            fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/admin/products/list/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                }
            })
        );

        if (error) {
            console.error("Error fetching products:", error);
            setLoading(false);
            return;
        }

        if (!result?.ok) {
            console.error("Failed to fetch products:", result?.statusText);
            setLoading(false);
            return;
        }

        const data = await result.json();
        setProducts(data.data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAddProduct = () => {
        setEditingProduct(null);
        setIsFormOpen(true);
    };

    const handleEditProduct = (product: Product) => {
        setEditingProduct(product);
        setIsFormOpen(true);
    };

    const handleFormSubmit = async (productData: Partial<Product>) => {
        const accessToken: string = Session.getCookie('x-access-token');
        setLoading(true);

        try {
            if (editingProduct) {
                const [error, result] = await catchError(
                    fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/admin/products/update/${editingProduct.id}/`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${accessToken}`,
                        },
                        body: JSON.stringify(productData)
                    })
                );

                if (error) {
                    Session.showAlert({ str: error.message, type: 'error' });
                    console.error("Error fetching products:", error);
                    setLoading(false);
                    return;
                }

                if (!result?.ok) {
                    Session.showAlert({ str: "Failed to edit products", type: 'error' });
                    console.error("Failed to fetch products:", result?.statusText);
                    setLoading(false);
                    return;
                }
                fetchProducts();
            } else {
                const [error, result] = await catchError(
                    fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/admin/products/create/`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${accessToken}`,
                        },
                        body: JSON.stringify(productData)
                    })
                );

                if (error) {
                    Session.showAlert({ str: error.message, type: 'error' });
                    console.error("Error fetching products:", error);
                    setLoading(false);
                    return;
                }

                if (!result?.ok) {
                    const data = await result.json();
                    Session.showAlert({ str: data.message, type: 'error' });
                    console.error("Failed to create products:", result?.statusText);
                    setLoading(false);
                    return;
                }
                fetchProducts();
            }
            setIsFormOpen(false);
            setEditingProduct(null);
            // Refresh products list
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    const handleDeleteProduct = async (productId: number) => {
        // Implement delete product logic
        const accessToken: string = Session.getCookie('x-access-token');
        setLoading(true);
        const [error, result] = await catchError(
            fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/admin/products/delete/${productId}/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                }
            })
        );

        if (error) {
            Session.showAlert({ str: error.message, type: 'error' });
            console.error("Error fetching products:", error);
            setLoading(false);
            return;
        }

        if (!result?.ok) {
            const data = await result.json();
            Session.showAlert({ str: data.message, type: 'error' });
            console.error("Failed to create products:", result?.statusText);
            setLoading(false);
            return;
        }
        fetchProducts();
    };

    const handleSearch = (query: string) => {
        // Implement search logic
    };

    return (
        <Layout>
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-dark-100">Products</h1>

                <ProductHeader
                    onAddProduct={handleAddProduct}
                    onSearch={handleSearch}
                />

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader className="animate-spin text-primary" size={32} />
                    </div>
                ) : (
                    <ProductGrid
                        products={products}
                        onEdit={handleEditProduct}
                        onDelete={handleDeleteProduct}
                    />
                )}
                <ProductForm
                    isOpen={isFormOpen}
                    onClose={() => {
                        setIsFormOpen(false);
                        setEditingProduct(null);
                    }}
                    onSubmit={handleFormSubmit}
                    editProduct={editingProduct || null}
                />

            </div>
        </Layout>
    );
};

export default ProductsPage;
