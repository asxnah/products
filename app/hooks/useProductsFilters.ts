import { useMemo, useState, useEffect } from "react";
import { Product } from "@/shared-types/product";

export type SortType = "none" | "asc" | "desc";
export type FilterType = "all" | "favorites";

interface UseProductsFiltersProps {
  products: Product[];
  favorites: number[];
  filter: FilterType;
  category: string;
  sort: SortType;
  query: string;
  page: number;
  itemsPerPage: number;
}

export function useProductsFilters({
  products,
  favorites,
  filter,
  category,
  sort,
  query,
  page,
  itemsPerPage,
}: UseProductsFiltersProps) {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // debounce
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(handler);
  }, [query]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filter === "favorites") {
      result = result.filter((p) => favorites.includes(p.id));
    }

    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    if (debouncedQuery.trim() !== "") {
      const q = debouncedQuery.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(q));
    }

    if (sort === "asc") result.sort((a, b) => a.price - b.price);
    if (sort === "desc") result.sort((a, b) => b.price - a.price);

    return result;
  }, [products, favorites, filter, category, debouncedQuery, sort]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / itemsPerPage),
  );

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, page, itemsPerPage]);

  const categories = useMemo(() => {
    const cats = products.map((p) => p.category);
    return ["all", ...Array.from(new Set(cats))];
  }, [products]);

  return { filteredProducts, paginatedProducts, totalPages, categories };
}
