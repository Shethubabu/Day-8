import { useState } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { ProductFilter } from '@/components/ProductFilter';
import { useProductSearch } from '@/hooks/useProductSearch';

export const ProductsPage: React.FC = () => {
  const allProducts = useGetProducts(); // Your API call
  const { searchQuery, setSearchQuery, searchResults } = useProductSearch(allProducts);

  return (
    <div className="p-6">
      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      {/* Filter and Display */}
      <ProductFilter products={searchResults} />
    </div>
  );
};