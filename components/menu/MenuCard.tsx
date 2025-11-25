"use client";

import { useState } from 'react';
import { Star, Flame, Minus, Plus, ShoppingCart, X } from 'lucide-react';
import Image from 'next/image';

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
  className?: string;
}

export default function MenuCard({ item, onAddToCart, className = '' }: MenuCardProps) {
  const [tempQuantity, setTempQuantity] = useState<number>(0);
  const [showQuantityControl, setShowQuantityControl] = useState(false);

  const hasDiscount = item.discount !== undefined && item.discount > 0;
  const discountedPrice = hasDiscount
    ? Math.round(item.price * (1 - item.discount / 100))
    : item.price;

  const handleAddClick = () => {
    setShowQuantityControl(true);
    setTempQuantity(1);
  };

  const handleConfirmAdd = () => {
    if (tempQuantity > 0) {
      onAddToCart(item, tempQuantity);
      setShowQuantityControl(false);
      setTempQuantity(0);
    }
  };

  const handleCancel = () => {
    setShowQuantityControl(false);
    setTempQuantity(0);
  };

  const handleDecrease = () => {
    if (tempQuantity > 1) {
      setTempQuantity(tempQuantity - 1);
    } else {
      handleCancel();
    }
  };

  const handleIncrease = () => {
    setTempQuantity(tempQuantity + 1);
  };

  return (
    <article 
      className={`bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col group ${className}`}
      aria-labelledby={`menu-${item.id}`}
    >
      {/* Image Container */}
      <div className="relative w-full h-40 sm:h-44 md:h-40 lg:h-44 overflow-hidden bg-gray-100">
        <Image
          src={item.image ?? '/placeholder.png'}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Discount Badge - Hanya tampil jika ada diskon dan lebih dari 0 */}
        {hasDiscount && item.discount && item.discount > 0 && (
          <div className="absolute top-2 left-2 bg-yellow-300 text-gray-900 px-2.5 py-1 rounded-full text-xs font-bold shadow-md">
            -{item.discount}%
          </div>
        )}

        {/* Popular Badge */}
        {item.isPopular && (
          <div className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
            <Flame size={12} />
            Hot
          </div>
        )}

        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col p-3 gap-2">
        {/* Title */}
        <div>
          <h3 
            id={`menu-${item.id}`}
            className="font-bold text-sm sm:text-base text-gray-900 line-clamp-2 group-hover:text-red-500 transition-colors duration-300"
          >
            {item.name}
          </h3>
          {item.description && (
            <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
              {item.description}
            </p>
          )}
        </div>

        {/* Rating */}
        {item.rating && (
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5 bg-amber-50 px-2 py-1 rounded-md">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-bold text-gray-900">{item.rating}</span>
            </div>
            <span className="text-xs text-gray-500">({item.reviews ?? 0})</span>
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price Section */}
        <div className="mb-2">
          <div className="flex items-end gap-2">
            <span className="font-black text-lg text-gray-900 group-hover:text-red-500 transition-colors duration-300">
              Rp {discountedPrice.toLocaleString('id-ID')}
            </span>
            {/* Original Price - Hanya tampil jika ada diskon */}
            {hasDiscount && item.discount && item.discount > 0 && (
              <span className="text-xs text-gray-400 line-through">
                Rp {item.price.toLocaleString('id-ID')}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        {!showQuantityControl ? (
          <button
            onClick={handleAddClick}
            className="w-full bg-red-50 text-red-500 hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-500 hover:text-white font-bold py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm"
            aria-label={`Tambah ${item.name} ke keranjang`}
          >
            <ShoppingCart size={14} />
            <span>Add</span>
          </button>
        ) : (
          <div className="flex gap-1.5 transition-all duration-300">
            {/* Quantity Control */}
            <div className="flex items-center border-2 border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
              <button
                onClick={handleDecrease}
                className="px-1.5 py-1 text-gray-600 hover:text-red-500 hover:bg-red-50 transition-all"
                aria-label="Decrease quantity"
                type="button"
              >
                <Minus size={14} />
              </button>
              <span className="px-2 py-1 font-bold text-gray-900 min-w-[2rem] text-center text-xs">
                {tempQuantity}
              </span>
              <button
                onClick={handleIncrease}
                className="px-1.5 py-1 text-gray-600 hover:text-red-500 hover:bg-red-50 transition-all"
                aria-label="Increase quantity"
                type="button"
              >
                <Plus size={14} />
              </button>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirmAdd}
              className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-lg text-sm transition-all hover:shadow-lg active:scale-95"
              aria-label="Confirm add to cart"
              type="button"
            >
              Add
            </button>

            {/* Cancel Button */}
            <button
              onClick={handleCancel}
              className="px-2 py-2 bg-gray-200 text-gray-600 hover:bg-gray-300 rounded-lg transition-all"
              aria-label="Cancel"
              type="button"
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
