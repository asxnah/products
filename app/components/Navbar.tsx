'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Create product', path: '/products/create-product' },
  ];

  return (
    <nav className='flex items-center justify-center gap-6 py-4 '>
      {navItems.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          className={`-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold hover:bg-zinc-50 transition-colors ${
            pathname === item.path
              ? 'text-pink-400 underline underline-offset-4'
              : 'text-zinc-700'
          }`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
