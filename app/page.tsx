import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center text-center py-20'>
      <h1 className='text-4xl font-bold mb-4'>Welcome to Products Store</h1>
      <p className='text-zinc-600 mb-8'>
        This is a easy SPA created using Next.js + Zustand for viewing, creating
        and editing products.
      </p>
      <div className='flex gap-4'>
        <Link
          href='/products'
          className='px-6 py-3 bg-pink-100 text-pink-500 rounded-lg transition duration-200 hover:bg-pink-200 hover:text-pink-600'
        >
          Scroll products
        </Link>

        <Link
          href='/products/create-product'
          className='px-6 py-3 bg-zinc-50 text-zinc-900 rounded-lg transition duration-200 hover:bg-zinc-100'
        >
          Create your own product
        </Link>
      </div>
      <a
        href='https://docs.google.com/document/d/1VadrT3-jkFH2V7mh0V3NJFYQrrYcoD0x/edit'
        target='_blank'
        className='mt-8 text-zinc-400 underline underline-offset-4'
      >
        TK link
      </a>
    </div>
  );
}
