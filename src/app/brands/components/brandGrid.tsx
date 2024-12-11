import React from 'react';
import BrandItem from './brandItems';
import { Brand } from '../types';

const BrandGrid = ({ brands, refetch }: { brands: Brand[], refetch: () => void }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {brands.map((brand) => (
                <BrandItem key={brand.id} brand={brand} refetch={refetch} />
            ))}
        </div>
    );
};

export default BrandGrid;
