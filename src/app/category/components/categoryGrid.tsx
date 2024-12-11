import React from 'react';
import CategoryItem from './categoryItems';
import { Category } from '../types';

const CategoryGrid = ({ categories, refetch }: { categories: Category[], refetch: () => void }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
                <CategoryItem key={category.id} category={category} refetch={refetch} />
            ))}
        </div>
    );
};

export default CategoryGrid;
