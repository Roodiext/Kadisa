'use client';

import { useEffect, useState } from 'react';
import { ShoppingCart, Search, Clock } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export default function Header({ cartCount, onCartClick, searchQuery = '', onSearchChange }: HeaderProps) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Sticky setelah scroll 250px (setelah hero image)
      setIsSticky(window.scrollY > 280);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Sticky Header - Muncul saat scroll */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-transform duration-300 ${
          isSticky ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img src="/img/xing.png" alt="KADISA Logo" className="w-10 h-10 object-contain" />
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-800">KADISA</h1>
                <p className="text-xs text-gray-500">Kantin Digital Sekolah</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Lagi mau makan apa?"
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 border-2 text-black border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
              />
            </div>

            {/* Riwayat Button */}
            <Link href="/orders" className="hidden sm:inline-flex items-center gap-2 mr-2 text-sm text-gray-700 hover:text-orange-600 transition-colors">
              <Clock size={18} />
              <span className="font-medium">Riwayat</span>
            </Link>

            {/* Cart Button */}
            <button
              onClick={onCartClick}
              className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 rounded-xl hover:shadow-lg transition-all"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Floating Search Bar - Overlay di Hero Image */}
      <div
        className={`fixed left-1/2 -translate-x-1/2 z-40 w-full max-w-2xl px-4 transition-all duration-300 ${
          isSticky ? 'opacity-0 pointer-events-none -top-32' : 'opacity-100 top-34'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl p-2 flex items-center gap-2">
          <Search className="text-gray-400 ml-3" size={22} />
          <input
            type="text"
            placeholder="Cari makanan atau minuman favorit..."
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="flex-1 py-3 px-2 bg-transparent focus:outline-none text-gray-700 placeholder:text-gray-400"
          />
          <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
            Cari
          </button>
        </div>
      </div>
    </>
  );
}