"use client";

import { useEffect, useMemo, useState } from "react";
import { useProductsStore } from "@/store/productsStore";
import ProductCard from "@/components/ProductCard";
import {
  ArrowUpDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  useProductsFilters,
  SortType,
  FilterType,
} from "@/hooks/useProductsFilters";

export default function ProductsPage() {
  const store = useProductsStore((state) => state);
  const { products, favorites, fetchProducts } = useMemo(
    () => ({
      products: store.products,
      favorites: store.favorites,
      fetchProducts: store.fetchProducts,
    }),
    [store.products, store.favorites, store.fetchProducts],
  );

  const [filter, setFilter] = useState<FilterType>("all");
  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState<SortType>("none");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  useEffect(() => {
    if (products.length === 0) fetchProducts();
  }, [products.length, fetchProducts]);

  // сброс страницы при изменении фильтров
  useEffect(() => setPage(1), [filter, category, sort, query]);

  const { paginatedProducts, totalPages, categories } = useProductsFilters({
    products,
    favorites,
    filter,
    category,
    sort,
    query,
    page,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {/* фильтр, поиск, сортировка */}
      <div className="mb-4 flex gap-2 flex-col md:flex-row">
        <div className="flex gap-2">
          <button
            aria-pressed={filter === "all"}
            className={`px-4 py-2 rounded-lg w-full md:w-fit ${
              filter === "all"
                ? "bg-pink-100 text-pink-500"
                : "bg-zinc-50 text-zinc-900 hover:bg-zinc-100"
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            aria-pressed={filter === "favorites"}
            className={`px-4 py-2 rounded-lg w-full md:w-fit ${
              filter === "favorites"
                ? "bg-pink-100 text-pink-500"
                : "bg-zinc-50 text-zinc-900 hover:bg-zinc-100"
            }`}
            onClick={() => setFilter("favorites")}
          >
            Favorite
          </button>
        </div>

        <div className="relative">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-zinc-50 text-zinc-900 hover:bg-zinc-100 rounded-lg pl-4 pr-10 py-2 focus:outline-none cursor-pointer appearance-none w-full md:w-fit"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all"
                  ? "All categories"
                  : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute top-3 right-3 pointer-events-none"
            size={16}
            color="#9f9fa9"
          />
        </div>

        <div className="relative">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortType)}
            className="bg-zinc-50 text-zinc-900 hover:bg-zinc-100 rounded-lg pl-4 pr-12 py-2 focus:outline-none cursor-pointer appearance-none w-full md:w-fit"
          >
            <option value="none">Default price</option>
            <option value="asc">From low</option>
            <option value="desc">From high</option>
          </select>
          <ArrowUpDown
            className="absolute top-3 right-3 pointer-events-none"
            size={16}
            color="#9f9fa9"
          />
        </div>

        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="w-full border border-zinc-200 rounded-lg focus:border-zinc-300 p-2"
        />
      </div>

      {/* вещи */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {paginatedProducts.length === 0 && (
          <p className="text-zinc-500 col-span-full">Nothing here yet</p>
        )}
      </div>

      {/* пагинация */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-3 py-2 bg-zinc-100 rounded disabled:opacity-40 flex place-items-center"
        >
          <ChevronLeft size={16} />
        </button>

        <span className="text-base/7 font-semibold text-zinc-700">
          {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-3 py-2 bg-zinc-100 rounded disabled:opacity-40 flex place-items-center"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
