"use client";

import { useEffect, useState } from 'react';
import Layout from '../dashboard/components/layout';
import Session from '../helpers/Session';
import catchError from '../helpers/catchError';
import BrandGrid from './components/brandGrid';
import { Loader, Plus } from 'lucide-react';
import BrandModal from './components/brandModal';
import { Brand } from './types';

const BrandPage = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchData = async () => {
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
            console.error("Error fetching brands:", error);
            setLoading(false);
            return;
        }

        if (!result?.ok) {
            console.error("Failed to fetch brands:", result?.statusText);
            setLoading(false);
            return;
        }

        const data = await result.json();
        setBrands(data || []);
        setLoading(false);
    };

    const createCategory = async (categoryData: Partial<Brand>) => {
        const accessToken = Session.getCookie('x-access-token');
        const [error, result] = await catchError(
            fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/admin/brands/create/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
                body: JSON.stringify(categoryData)
            })
        );

        if (error) {
            console.error("Error creating brand:", error);
            return;
        }

        if (!result?.ok) {
            console.error("Failed to create brand:", result?.statusText);
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
                <h1 className="text-2xl font-bold mb-4">Brands</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="mb-4 flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primarydark transition-colors"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Brand
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader className="animate-spin text-primary" size={32} />
                </div>
            ) : (
                <BrandGrid brands={brands} refetch={fetchData} />
            )}

            {isModalOpen && (
                <BrandModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onCreate={createCategory}
                />
            )}
        </Layout>
    );
};

export default BrandPage;
