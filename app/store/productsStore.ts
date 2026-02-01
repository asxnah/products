import { create } from "zustand";
import { Product } from "@/shared-types/product";
import { fetchProducts } from "api";

interface ProductState {
  products: Product[];
  favorites: number[];
  fetchProducts: () => Promise<void>;
  toggleLike: (id: number) => void;
  deleteProduct: (id: number) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: number, updated: Partial<Product>) => void;
  getProductById: (id: number) => Product | undefined;
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

  addProduct: (product) => {
    set((state) => ({
      products: [...state.products, product],
    }));
  },

  updateProduct: (id, updated) => {
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, ...updated } : p,
      ),
    }));
  },

  getProductById: (id) => get().products.find((p) => p.id === id),
}));
