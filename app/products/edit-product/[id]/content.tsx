"use client";

import { useRouter } from "next/navigation";
import { useProductsStore } from "@/store/productsStore";
import { EditProductForm } from "@/components/EditProductForm";

export default function EditProductPageClient({ id }: { id: string }) {
  const router = useRouter();
  const productId = Number(id);

  const product = useProductsStore((state) => state.getProductById(productId));

  const updateProduct = useProductsStore((state) => state.updateProduct);

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

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit product</h1>

      <EditProductForm
        product={product}
        onSubmit={(data) => {
          updateProduct(productId, data);
          router.push(`/products/${productId}`);
        }}
      />
    </div>
  );
}
