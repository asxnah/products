import EditProductPageClient from "./content";
import { fetchProducts } from "api";

export async function generateStaticParams() {
  const products = await fetchProducts();

  return products.map((p) => ({
    id: String(p.id),
  }));
}

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EditProductPageClient id={id} />;
}
