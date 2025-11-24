'use client';

import { ShoppingCart } from 'lucide-react';

interface FloatingCartProps {
  cartCount: number;
  onClick: () => void;
}

export default function FloatingCart({ cartCount, onClick }: FloatingCartProps) {
  if (cartCount === 0) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-40"
    >
      <ShoppingCart size={28} />
      <span className="absolute -top-2 -right-2 bg-green-500 text-white text-sm font-bold w-7 h-7 rounded-full flex items-center justify-center">
        {cartCount}
      </span>
    </button>
  );
}