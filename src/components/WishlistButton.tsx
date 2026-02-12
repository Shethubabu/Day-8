import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWishlistStore } from '@/store/wishlistStore';
import { Product } from '@/types';

interface WishlistButtonProps {
  product: Product;
}

export const WishlistButton: React.FC<WishlistButtonProps> = ({ product }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={() => {
        if (inWishlist) {
          removeFromWishlist(product.id);
        } else {
          addToWishlist(product);
        }
      }}
      className={inWishlist ? 'border-red-500 bg-red-50' : ''}
    >
      <Heart
        size={18}
        fill={inWishlist ? '#ef4444' : 'none'}
        color={inWishlist ? '#ef4444' : '#666'}
      />
    </Button>
  );
};