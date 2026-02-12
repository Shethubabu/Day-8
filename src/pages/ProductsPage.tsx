import { useEffect, useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { ProductFilter } from "@/components/ProductFilter";
import { useProductSearch } from "@/hooks/useProductSearch";
import { Product } from "@/types";

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const { searchQuery, setSearchQuery, searchResults } =
    useProductSearch(products);

  if (loading) {
    return <div className="text-center py-20">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold mb-8">Products</h1>

      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      {/* Filter and Display */}
      <ProductFilter products={searchResults} />
    </div>
  );
};
