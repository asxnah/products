import ProductDetailPageClient from './content';
import { fetchProducts } from 'api';

export async function generateStaticParams() {
  const products = await fetchProducts();

  return products.map((product) => ({
    id: String(product.id),
  }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ProductDetailPageClient id={id} />;
}
