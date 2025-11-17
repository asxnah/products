'use client';

import { useRouter } from 'next/navigation';
import { useProductsStore } from '@/store/productsStore';
import { Product } from '@/types/product';
import { Heart, Star, Trash } from 'lucide-react';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const router = useRouter();
  const toggleLike = useProductsStore((state) => state.toggleLike);
  const deleteProduct = useProductsStore((state) => state.deleteProduct);
  const favorites = useProductsStore((state) => state.favorites);
  const isFavorite = favorites.includes(product.id);

  return (
    <div className='p-8 cursor-pointer flex flex-col relative'>
      <img
        src={product.thumbnail}
        alt={product.title}
        className='w-full h-40 object-contain mb-4'
        loading='lazy'
        onClick={() => router.push(`/products/${product.id}`)}
      />
      <p
        className='text-lg mb-1 font-medium'
        onClick={() => router.push(`/products/${product.id}`)}
      >
        $ {product.price.toFixed(2)}
      </p>
      <h2
        className='mb-1 line-clamp-1'
        onClick={() => router.push(`/products/${product.id}`)}
      >
        {product.title}
      </h2>
      <p
        className='flex items-center gap-1 font-medium'
        onClick={() => router.push(`/products/${product.id}`)}
      >
        <Star size={16} color='#ffd60a' /> {product.rating}
      </p>

      <div className='absolute top-2 right-2 flex gap-2'>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleLike(product.id);
          }}
          className='p-1 rounded-lg'
        >
          <Heart size={16} color={isFavorite ? '#ef233c' : '#9f9fa9'} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteProduct(product.id);
          }}
          className='p-1 text-zinc-400 hover:text-zinc-700'
        >
          <Trash size={16} color='#9f9fa9' />
        </button>
      </div>
    </div>
  );
}
