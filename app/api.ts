import { Product } from "@/shared-types/product";

const API_URL = "https://dummyjson.com/products";

export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch(API_URL, {
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error("Failed to fetch products");

    const data = await res.json();
    return data.products as Product[];
  } catch (err) {
    console.error("API error:", err);
    return [];
  }
}

export async function fetchProductById(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    return (await res.json()) as Product;
  } catch (err) {
    console.error("API error:", err);
    return null;
  }
}
