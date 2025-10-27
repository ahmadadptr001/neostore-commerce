import { create } from "zustand";

export const useProductStore = create((set) => ({
  produk: [],
  ambilProduk: async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    set({ produk: data });
  },
}));
