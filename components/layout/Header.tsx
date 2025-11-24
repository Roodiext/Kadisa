'use client';

import { useEffect, useState } from 'react';
import { ShoppingCart, Search } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function Header({ cartCount, onCartClick }: HeaderProps) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById('hero-sentinel');
    if (!sentinel || typeof IntersectionObserver === 'undefined') {
      // fallback: stick after some scroll
      const onScroll = () => setIsSticky(window.scrollY > 80);
      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
    }

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // when sentinel is not visible, make header sticky
        setIsSticky(!entry.isIntersecting);
      },
      { root: null, threshold: 0 }
    );

    obs.observe(sentinel);
    return () => obs.disconnect();
  }, []);

  return (
    <header
      className={`z-50 w-full transition-all duration-300 ${isSticky ? 'fixed top-0 left-0 right-0 bg-white shadow-md' : 'absolute inset-x-0 top-6 pointer-events-none'}`}
      aria-hidden={false}
    >
      <div className={`max-w-7xl mx-auto px-4 ${isSticky ? 'py-3' : 'py-0'}`}>
        <div className={`${isSticky ? '' : 'pointer-events-auto'} mx-auto max-w-7xl`}> 
          {/* top bar (when overlay we show a compact floating container) */}
          <div className={`flex items-center justify-between ${isSticky ? 'mb-2' : 'bg-white/90 backdrop-blur-sm rounded-3xl px-4 py-3 shadow-md'}`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                K
              </div>
              <div className={`${isSticky ? '' : 'hidden sm:block'}`}>
                <h1 className="text-lg font-bold text-gray-800">KADISA</h1>
                <p className="text-xs text-gray-500">Pesan makanan favoritmu!</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className={`relative ${isSticky ? '' : 'hidden sm:block'}`}>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Lagi mau makan apa?"
                  className="w-64 pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none hidden md:inline-block"
                />
              </div>

              <button
                onClick={onCartClick}
                className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 rounded-xl hover:shadow-lg transition-all pointer-events-auto"
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
        </div>
      </div>
    </header>
  );
}