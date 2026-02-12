import { useState, useMemo } from "react";
import { Product } from "@/types";

export const useProductSearch = (products: Product[]) => {
  const [searchQuery, setSearchQuery] = useState("");

  const searchResults = useMemo(() => {
    if (!searchQuery) return products;

    return products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, products]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
  };
};
