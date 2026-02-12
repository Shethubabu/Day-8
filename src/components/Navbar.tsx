import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, LogOut, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useAuthStore } from '@/store/authStore';

export const Navbar: React.FC = () => {
  const { getItemCount } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const { user, logout, isAuthenticated } = useAuthStore();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            🛍️ Shopping
          </Link>

          <div className="flex gap-4 items-center">
            {/* Cart */}
            <Link to="/cart" className="relative">
              <Button variant="outline" size="icon">
                <ShoppingCart size={20} />
                {getItemCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getItemCount()}
                  </span>
                )}
              </Button>
            </Link>

            {/* Wishlist */}
            <Link to="/wishlist" className="relative">
              <Button variant="outline" size="icon">
                <Heart size={20} />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Button>
            </Link>

            {/* Auth */}
            {isAuthenticated && user ? (
              <div className="flex gap-2 items-center">
                <span className="text-sm">{user.name}</span>
                <Link to="/orders">
                  <Button variant="outline" size="sm">Orders</Button>
                </Link>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={logout}
                >
                  <LogOut size={18} />
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};