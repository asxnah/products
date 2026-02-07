import { notFound } from "next/navigation";
import ProductDetailPageClient from "./content";
import { fetchProductById, fetchProducts } from "api";

export async function generateStaticParams() {
  const products = await fetchProducts();

  return products.map((p) => ({
    id: String(p.id),
  }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await fetchProductById(id);

  if (!product) {
    notFound();
  }

  return <ProductDetailPageClient product={product} />;
}
