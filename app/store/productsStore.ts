import { create } from "zustand";
import { Product } from "@/shared-types/product";
import { fetchProducts } from "api";

interface ProductState {
  products: Product[];
  favorites: number[];
  fetchProducts: () => Promise<void>;
  toggleLike: (id: number) => void;
  deleteProduct: (id: number) => void;
}

export const useProductsStore = create<ProductState>((set, get) => ({
  products: [],
  favorites: [],

  fetchProducts: async () => {
    const data = await fetchProducts();
    set({ products: data });
  },

  toggleLike: (id) => {
    const { favorites } = get();
    set({
      favorites: favorites.includes(id)
        ? favorites.filter((fid) => fid !== id)
        : [...favorites, id],
    });
  },

  deleteProduct: (id) => {
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    }));
  },
}));
