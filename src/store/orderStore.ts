import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Order, OrderStatus, ShippingAddress } from '@/types';

interface OrderStore {
  orders: Order[];
  createOrder: (userId: string, items: CartItem[], shippingAddress: ShippingAddress, total: number) => Order;
  getOrdersByUser: (userId: string) => Order[];
  getOrderById: (orderId: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],

      createOrder: (userId, items, shippingAddress, total) => {
        const newOrder: Order = {
          id: Math.random().toString(36).substr(2, 9),
          userId,
          items,
          total,
          status: 'pending',
          shippingAddress,
          paymentMethod: 'credit-card',
          createdAt: new Date(),
          updatedAt: new Date()
        };

        set((state) => ({
          orders: [...state.orders, newOrder]
        }));

        return newOrder;
      },

      getOrdersByUser: (userId) => {
        return get().orders.filter(order => order.userId === userId);
      },

      getOrderById: (orderId) => {
        return get().orders.find(order => order.id === orderId);
      },

      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map(order =>
            order.id === orderId
              ? { ...order, status, updatedAt: new Date() }
              : order
          )
        }));
      }
    }),
    {
      name: 'orders-storage'
    }
  )
);
export type { OrderStatus };