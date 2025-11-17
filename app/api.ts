import { Product } from '@/types/product';

export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch('https://dummyjson.com/products');
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();
    return data.products as Product[];
  } catch (err) {
    console.error('API error:', err);
    return [];
  }
}
