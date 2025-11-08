import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// code by ahmadadptr
export const useProductStore = create(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      notifWishlistExist: false,

      addToCart: (product) => {
        const existing = get().cart.find((item) => item.id == product.id);
        if (existing) {
          set({
            cart: get().cart.map((item) => {
              return item.id === product.id
                ? { ...item, quantity: item.quantity + product.quantity }
                : item;
            }),
          });
        } else {
          set({
            cart: [...get().cart, product],
          });
        }
      },

      removeToCart: (productID) => {
        set({
          cart: get().cart.filter(item => item.id !== productID)
        })
      },

      updateQuantity: (productID, quantity) => {
        set({
          cart: get().cart.map((item) =>
            item.id === productID ? { ...item, quantity } : item
          ),
        });
      },

      addToWishList: (product) => {
        const exist = get().wishlist.find(item => item.id === product.id);
        if (exist) {
          set({
            notifWishlistExist: true,
          })
        } else {
          set({
            wishlist: [...get().wishlist, product],
            notifWishlistExist: false
          })
        }
      }
    }),
    {
      name: 'cart-storage',
    }
  )
);
