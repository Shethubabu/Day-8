import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { useOrderStore } from '@/store/orderStore';
import { ShippingAddress } from '@/types';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const { createOrder } = useOrderStore();

  const [shippingData, setShippingData] = useState<ShippingAddress>({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleShippingChange = (field: keyof ShippingAddress, value: string) => {
    setShippingData(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentChange = (field: keyof typeof paymentData, value: string) => {
    setPaymentData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (!user) {
        throw new Error('User not authenticated');
      }

      createOrder(user.id, items, shippingData, getTotal());
      clearCart();
      navigate('/orders');
    } catch (error) {
      alert('Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <Button onClick={() => navigate('/products')}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Shipping Address */}
            <section className="border rounded-lg p-6 bg-white">
              <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Full Name"
                    value={shippingData.fullName}
                    onChange={(e) => handleShippingChange('fullName', e.target.value)}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={shippingData.email}
                    onChange={(e) => handleShippingChange('email', e.target.value)}
                    required
                  />
                </div>

                <Input
                  placeholder="Phone"
                  value={shippingData.phone}
                  onChange={(e) => handleShippingChange('phone', e.target.value)}
                  required
                />

                <Input
                  placeholder="Street Address"
                  value={shippingData.street}
                  onChange={(e) => handleShippingChange('street', e.target.value)}
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="City"
                    value={shippingData.city}
                    onChange={(e) => handleShippingChange('city', e.target.value)}
                    required
                  />
                  <Input
                    placeholder="State"
                    value={shippingData.state}
                    onChange={(e) => handleShippingChange('state', e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Zip Code"
                    value={shippingData.zipCode}
                    onChange={(e) => handleShippingChange('zipCode', e.target.value)}
                    required
                  />
                  <Input
                    placeholder="Country"
                    value={shippingData.country}
                    onChange={(e) => handleShippingChange('country', e.target.value)}
                    required
                  />
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section className="border rounded-lg p-6 bg-white">
              <h2 className="text-xl font-bold mb-4">Payment Details</h2>
              <div className="space-y-4">
                <Input
                  placeholder="Card Number"
                  value={paymentData.cardNumber}
                  onChange={(e) => handlePaymentChange('cardNumber', e.target.value.replace(/\s/g, '').slice(0, 16))}
                  maxLength={19}
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="MM/YY"
                    value={paymentData.expiryDate}
                    onChange={(e) => handlePaymentChange('expiryDate', e.target.value)}
                    required
                  />
                  <Input
                    placeholder="CVV"
                    type="password"
                    value={paymentData.cvv}
                    onChange={(e) => handlePaymentChange('cvv', e.target.value.slice(0, 4))}
                    maxLength={4}
                    required
                  />
                </div>
              </div>
            </section>

            <Button
              type="submit"
              disabled={isProcessing}
              className="w-full"
            >
              {isProcessing ? 'Processing...' : 'Complete Payment'}
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="border rounded-lg p-6 h-fit bg-white">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${getTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>FREE</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${getTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};