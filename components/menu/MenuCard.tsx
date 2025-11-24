"use client";

import { useState } from 'react';
import { Star, TrendingUp, Minus, Plus } from 'lucide-react';

interface MenuItem {
  id: string | number;
  name: string;
  description?: string;
  price: number;
  discount?: number;
  image?: string;
  isPopular?: boolean;
  rating?: number;
  reviews?: number;
}

interface MenuCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem, quantity: number) => void;
  className?: string; // allow parent to tweak sizing / appearance
}

export default function MenuCard({ item, onAddToCart, className = '' }: MenuCardProps) {
  const [quantity, setQuantity] = useState<number>(0);

  const handleAdd = () => {
    setQuantity(1);
    onAddToCart(item, 1);
  };

  const handleIncrease = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    onAddToCart(item, newQty);
  };

  const handleDecrease = () => {
    const newQty = Math.max(0, quantity - 1);
    setQuantity(newQty);
    if (newQty === 0) {
      onAddToCart(item, 0);
    } else {
      onAddToCart(item, newQty);
    }
  };

  // Hitung harga setelah diskon
  const discountedPrice = item.discount && item.discount > 0
    ? item.price - (item.price * item.discount / 100)
    : item.price;

  return (
    <article className={`bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all ${className}`} aria-labelledby={`menu-${item.id}`}>
      {/* Image */}
      <div className="relative w-full">
        <img
          src={item.image ?? '/placeholder.png'}
          alt={item.name}
          className="w-full h-44 sm:h-52 md:h-44 lg:h-52 object-cover"
        />

        {/* Discount */}
        {item.discount && item.discount > 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            {item.discount}% OFF
          </span>
        )}

        {/* Popular */}
        {item.isPopular && (
          <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
            <TrendingUp size={12} />
            Popular
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-3">
        <div>
          <h3 id={`menu-${item.id}`} className="font-semibold text-gray-800 text-base sm:text-lg line-clamp-2">
            {item.name}
          </h3>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-orange-500">
              <Star size={14} />
              <span className="text-sm font-semibold">{item.rating ?? '-'}</span>
            </div>
            <span className="text-xs text-gray-400">({item.reviews ?? 0})</span>
          </div>

          <div className="text-right">
            {item.discount && item.discount > 0 ? (
              <div>
                <div className="text-xs text-gray-400 line-through">Rp {item.price.toLocaleString()}</div>
                <div className="text-lg font-bold text-orange-600">Rp {discountedPrice.toLocaleString()}</div>
              </div>
            ) : (
              <div className="text-lg font-bold text-gray-800">Rp {item.price.toLocaleString()}</div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex-1" />
          {quantity === 0 ? (
            <button
              onClick={handleAdd}
              className="ml-auto bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-md transition-all"
              aria-label={`Tambah ${item.name} ke keranjang`}
            >
              Tambah
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
              <button
                onClick={handleDecrease}
                className="w-8 h-8 flex items-center justify-center bg-white rounded-lg hover:bg-gray-200 transition-all"
                aria-label={`Kurangi ${item.name}`}
              >
                <Minus size={16} />
              </button>
              <span className="font-bold w-6 text-center">{quantity}</span>
              <button
                onClick={handleIncrease}
                className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:shadow-lg transition-all"
                aria-label={`Tambah ${item.name}`}
              >
                <Plus size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
