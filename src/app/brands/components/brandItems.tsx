import React from 'react';
import { Trash } from 'lucide-react';
import { Brand } from '../types';
import Session from '@/app/helpers/Session';
import catchError from '@/app/helpers/catchError';

const BrandItem = ({ brand, refetch }: { brand: Brand, refetch: () => void }) => {
    
    const handleDelete = async () => {
        const accessToken = Session.getCookie('x-access-token');
        const [error, result] = await catchError(
            fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/admin/brands/delete/${brand.id}/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                }
            })
        );
        if(error){
            console.error("Error deleting brand:", error);
            return;
        }
        if (!result?.ok) {
            console.error("Failed to delete brand:", result?.statusText);
            return;
        }
        const data = await result.json();
        Session.showAlert({str: data.message, type: 'success'});
        refetch();
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md border border-graylight">
            <img src={brand.image_url} alt={brand.title} className="w-full h-32 object-cover rounded-md mb-2" />
            <h2 className="text-lg font-semibold text-primarydark">{brand.title}</h2>
            <button onClick={handleDelete} className="mt-2 text-red flex items-center">
                <Trash className="mr-1" />
                Delete
            </button>
        </div>
    );
};

export default BrandItem;
