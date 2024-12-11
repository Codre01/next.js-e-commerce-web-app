"use client";

import { useEffect, useState } from 'react';
import Layout from '../dashboard/components/layout';
import Session from '../helpers/Session';
import catchError from '../helpers/catchError';
import CategoryGrid from './components/categoryGrid';
import { Loader, Plus } from 'lucide-react';
import CategoryModal from './components/categoryModal';
import { Category } from './types';

const CategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchData = async () => {
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

    const createCategory = async (categoryData: Partial<Category>) => {
        const accessToken = Session.getCookie('x-access-token');
        const [error, result] = await catchError(
            fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/admin/categories/create/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
                body: JSON.stringify(categoryData)
            })
        );

        if (error) {
            console.error("Error creating category:", error);
            return;
        }

        if (!result?.ok) {
            console.error("Failed to create category:", result?.statusText);
            return;
        }

        fetchData();
        setIsModalOpen(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Layout>
            <div className='flex items-center justify-between'>
                <h1 className="text-2xl font-bold mb-4">Categories</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="mb-4 flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primarydark transition-colors"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Category
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader className="animate-spin text-primary" size={32} />
                </div>
            ) : (
                <CategoryGrid categories={categories} refetch={fetchData} />
            )}

            {isModalOpen && (
                <CategoryModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onCreate={createCategory}
                />
            )}
        </Layout>
    );
};

export default CategoryPage;
