"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useProductsStore } from "@/store/productsStore";
import { Product } from "@/shared-types/product";

export default function CreateProductPage() {
  const addProduct = useProductsStore((state) => state.addProduct);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Omit<Product, "id" | "rating">>();

  const onSubmit = (data: Omit<Product, "id" | "rating">) => {
    const newProduct: Product = {
      ...data,
      id: Date.now(),
      price: Number(data.price),
      rating: 0,
    };

    addProduct(newProduct);
    reset();
    router.push("/products");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create product</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            {...register("title", { required: "Enter title" })}
            className="w-full border border-zinc-200 rounded-lg focus:border-zinc-300 p-2 rounded"
          />
          {errors.title && (
            <p className="text-red-700 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            {...register("description", {
              required: "Enter description",
              minLength: { value: 10, message: "At least 10 symbols" },
            })}
            className="w-full border border-zinc-200 rounded-lg focus:border-zinc-300 p-2 rounded"
          />
          {errors.description && (
            <p className="text-red-700 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            step="0.01"
            {...register("price", {
              required: "Enter price",
              min: { value: 0.01, message: "Price should be higher than 0" },
            })}
            className="w-full border border-zinc-200 rounded-lg focus:border-zinc-300 p-2 rounded"
          />
          {errors.price && (
            <p className="text-red-700 text-sm">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <input
            type="text"
            {...register("category", { required: "Enter category" })}
            className="w-full border border-zinc-200 rounded-lg focus:border-zinc-300 p-2 rounded"
          />
          {errors.category && (
            <p className="text-red-700 text-sm">{errors.category.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Preview URL</label>
          <input
            type="url"
            {...register("thumbnail", {
              required: "Enter preview thumbnail link",
            })}
            className="w-full border border-zinc-200 rounded-lg focus:border-zinc-300 p-2 rounded"
          />
          {errors.thumbnail && (
            <p className="text-red-700 text-sm">{errors.thumbnail.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-pink-100 text-pink-500 px-4 py-2 rounded rounded-lg transition duration-200 hover:bg-pink-200 hover:text-pink-600"
        >
          Create
        </button>
      </form>
    </div>
  );
}
