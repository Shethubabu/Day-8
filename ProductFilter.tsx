import { Button } from '@/components/ui/button';
import { useProductFilter, Product } from '@/hooks/useProductFilter';

interface ProductFilterProps {
  products: Product[];
}

export const ProductFilter: React.FC<ProductFilterProps> = ({ products }) => {
  const { categories, selectedCategory, setSelectedCategory, filteredProducts } = 
    useProductFilter(products);

  return (
    <div className="w-full">
      {/* Category Filter Buttons */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            variant={selectedCategory === category ? 'default' : 'outline'}
            className="capitalize"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 py-8">
          No products found in {selectedCategory} category
        </p>
      )}
    </div>
  );
};