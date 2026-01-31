"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useProductsStore } from "@/store/productsStore";
import { Product } from "@/shared-types/product";

export default function EditProductPageClient({ id }: { id: string }) {
  const router = useRouter();

  const product = useProductsStore((state) =>
    state.products.find((p) => p.id === Number(id)),
  );

  const updateProduct = useProductsStore((state) => state.updateProduct);

  const { register, handleSubmit, reset } = useForm<
    Omit<Product, "id" | "rating">
  >({
    defaultValues: product
      ? {
          title: product.title,
          description: product.description,
          price: product.price,
          category: product.category,
          thumbnail: product.thumbnail,
        }
      : {},
  });

  if (!product) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold mb-6">Product not found</h1>
        <button
          className="px-6 py-3 bg-pink-100 text-pink-500 rounded-lg"
          onClick={() => router.push("/products")}
        >
          Back
        </button>
      </div>
    );
  }

  const onSubmit = (data: Omit<Product, "id" | "rating">) => {
    updateProduct(product.id, {
      ...data,
      price: Number(data.price),
    });

    reset();
    router.push(`/products/${product.id}`);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit product</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            {...register("title")}
            className="w-full border border-zinc-200 rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            {...register("description")}
            className="w-full border border-zinc-200 rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            step="0.01"
            {...register("price")}
            className="w-full border border-zinc-200 rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <input
            type="text"
            {...register("category")}
            className="w-full border border-zinc-200 rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Preview URL</label>
          <input
            type="url"
            {...register("thumbnail")}
            className="w-full border border-zinc-200 rounded-lg p-2"
          />
        </div>

        <button
          type="submit"
          className="bg-pink-100 text-pink-500 px-4 py-2 rounded-lg hover:bg-pink-200 hover:text-pink-600"
        >
          Save changes
        </button>
      </form>
    </div>
  );
}
