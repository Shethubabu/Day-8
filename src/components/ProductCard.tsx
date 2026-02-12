import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { WishlistButton } from './WishlistButton';
import { Button } from '@/components/ui/Button';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCartStore();

  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition bg-white">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-blue-600">${product.price}</span>
          <div className="flex gap-2">
            <Button
              onClick={() => addToCart(product)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Add to Cart
            </Button>
            <WishlistButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};