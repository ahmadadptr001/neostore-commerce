import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// code by ahmadadptr
export const useProductStore = create(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) => {
        const existing = get().cart.find((item) => item.id === product.id);
        if (existing) {
          set({
            cart: [get().cart.map((item) => {
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item;
            })],
          });
        } else {
          set({
            cart: [...get().cart, product],
          });
        }
      },

      updateQuantity: (productID, quantity) => {
        set({
          cart : get().cart.map(item => item.id === productID ? {...item, quantity} : item)
        })
      }
    }),
    {
      name: 'cart-storage',
    }
  )
);
