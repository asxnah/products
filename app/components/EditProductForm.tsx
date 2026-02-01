import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Product } from "@/shared-types/product";

type FormData = Omit<Product, "id" | "rating">;

interface Props {
  product: Product;
  onSubmit: (data: FormData) => void;
}

export function EditProductForm({ product, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  // ✅ Correct defaultValues handling
  useEffect(() => {
    reset({
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      thumbnail: product.thumbnail,
    });
  }, [product, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <label htmlFor="title" className="block mb-1 font-medium">
          Title
        </label>
        <input
          id="title"
          {...register("title", { required: "Title is required" })}
          className="w-full border border-zinc-200 rounded-lg p-2"
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block mb-1 font-medium">
          Description
        </label>
        <textarea
          id="description"
          {...register("description", {
            required: "Description is required",
          })}
          className="w-full border border-zinc-200 rounded-lg p-2"
        />
      </div>

      <div>
        <label htmlFor="price" className="block mb-1 font-medium">
          Price
        </label>
        <input
          id="price"
          type="number"
          step="0.01"
          {...register("price", {
            valueAsNumber: true, // ✅ no manual Number()
            min: { value: 0, message: "Price must be positive" },
          })}
          className="w-full border border-zinc-200 rounded-lg p-2"
        />
        {errors.price && (
          <p className="text-sm text-red-500">{errors.price.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="block mb-1 font-medium">
          Category
        </label>
        <input
          id="category"
          {...register("category", { required: true })}
          className="w-full border border-zinc-200 rounded-lg p-2"
        />
      </div>

      <div>
        <label htmlFor="thumbnail" className="block mb-1 font-medium">
          Preview URL
        </label>
        <input
          id="thumbnail"
          type="url"
          {...register("thumbnail", {
            pattern: {
              value: /^https?:\/\//,
              message: "Enter a valid URL",
            },
          })}
          className="w-full border border-zinc-200 rounded-lg p-2"
        />
        {errors.thumbnail && (
          <p className="text-sm text-red-500">{errors.thumbnail.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-pink-100 text-pink-500 px-4 py-2 rounded-lg hover:bg-pink-200 hover:text-pink-600"
      >
        Save changes
      </button>
    </form>
  );
}
