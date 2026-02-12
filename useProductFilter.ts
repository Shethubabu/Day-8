import { useState, useMemo } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

interface UseProductFilterResult {
  products: Product[];
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  filteredProducts: Product[];
}

export const useProductFilter = (allProducts: Product[]): UseProductFilterResult => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = useMemo(() => {
    const unique = ['all', ...new Set(allProducts.map(p => p.category))];
    return unique;
  }, [allProducts]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') {
      return allProducts;
    }
    return allProducts.filter(product => product.category === selectedCategory);
  }, [allProducts, selectedCategory]);

  return {
    products: allProducts,
    categories,
    selectedCategory,
    setSelectedCategory,
    filteredProducts
  };
};