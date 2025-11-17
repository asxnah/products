'use client';

import { useRouter } from 'next/navigation';
import { useProductsStore } from '@/store/productsStore';
import { ArrowLeft, Star } from 'lucide-react';

export default function ProductDetailPageClient({ id }: { id: string }) {
  const router = useRouter();

  const product = useProductsStore((state) =>
    state.products.find((p) => p.id === Number(id))
  );

  if (!product) {
    return (
      <div className='max-w-xl mx-auto p-6 text-center'>
        <h1 className='text-3xl font-bold mb-6'>Not found</h1>
        <button
          className='px-6 py-3 bg-pink-100 text-pink-500 rounded-lg transition duration-200 hover:bg-pink-200 hover:text-pink-600'
          onClick={() => router.push('/products')}
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className='max-w-3xl mx-auto px-4'>
      <div className='flex gap-2 mb-10'>
        <button
          onClick={() => router.push('/products')}
          className='text-sm text-gray-400 font-medium transition duration-200 hover:text-pink-500 '
        >
          Products
        </button>
        <p className='text-sm text-gray-400 font-medium'>&gt;</p>
        <p className='text-sm text-gray-400 font-medium'>
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </p>
      </div>

      <div className='flex flex-col md:flex-row gap-6'>
        <img
          src={product.thumbnail}
          alt={product.title}
          className='w-full md:w-1/3 h-64 object-contain'
        />

        <div className='flex-1'>
          <h1 className='text-3xl font-bold mb-2 break-all'>{product.title}</h1>
          <p className='text-4xl font-bold mb-2 break-all'>
            $ {product.price.toFixed(2)}
          </p>
          {product.rating && (
            <p className='flex items-center gap-1 mb-3 font-medium'>
              <Star size={16} color='#ffd60a' /> {product.rating}
            </p>
          )}
          <h2 className='text-xl font-bold mb-2'>Description</h2>
          <p className='text-zinc-700 mb-2'>
            {product.description.charAt(0).toUpperCase() +
              product.description.slice(1)}
          </p>
        </div>
      </div>

      <div className='mt-8 flex gap-2'>
        <button
          onClick={() => router.push('/products')}
          className='px-6 py-3 bg-zinc-50 text-zinc-900 rounded-lg transition duration-200 hover:bg-zinc-100 flex items-center gap-2'
        >
          <ArrowLeft size={16} /> View all products
        </button>
        <button
          onClick={() => router.push(`/products/edit-product/${product.id}`)}
          className='px-6 py-3 bg-pink-100 text-pink-500 rounded-lg transition duration-200 hover:bg-pink-200 hover:text-pink-600'
        >
          Edit this product
        </button>
      </div>
    </div>
  );
}
