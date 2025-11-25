'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Star, ShoppingCart, Plus, Minus, Flame } from 'lucide-react';

interface ItemType {
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

interface MenuPopulerCardProps {
  item: ItemType;
  onAddToCart: (item: ItemType, quantity: number) => void;
}

export default function MenuPopulerCard({ item, onAddToCart }: MenuPopulerCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showQuantity, setShowQuantity] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const discountedPrice = item.discount
    ? Math.round(item.price * (1 - item.discount / 100))
    : item.price;

  // Intersection Observer untuk scroll reveal - bisa diulang
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Animasi terjadi ketika card masuk viewport
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Reset animasi ketika card keluar viewport
          setIsVisible(false);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const handleAddClick = () => {
    setShowQuantity(true);
  };

  const handleConfirmAdd = () => {
    onAddToCart(item, quantity);
    setShowQuantity(false);
    setQuantity(1);
  };

  return (
    <div
      ref={cardRef}
      className={`h-full transition-all duration-1000 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-12'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Card - Tall & Premium */}
      <div
        className={`bg-white rounded-3xl overflow-hidden h-full flex flex-col transition-all duration-500 ease-out relative group ${
          isHovered 
            ? 'shadow-2xl -translate-y-4' 
            : 'shadow-lg'
        }`}
      >
        {/* Glowing Background Effect */}
        <div className={`absolute -inset-1 bg-gradient-to-r from-red-500/20 via-orange-500/10 to-red-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10`} />

        {/* Image Container - Large & Premium */}
        <div className="relative w-full h-56 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          {item.image ? (
            <>
              {/* Blur Background */}
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover blur-sm scale-110"
              />
              {/* Main Image */}
              <Image
                src={item.image}
                alt={item.name}
                fill
                className={`object-cover transition-all duration-700 ease-out ${
                  isHovered 
                    ? 'scale-110 brightness-125' 
                    : 'scale-100 brightness-100'
                }`}
              />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-500 to-orange-500">
              <ShoppingCart size={48} className="text-white/50" />
            </div>
          )}

          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-70'
          }`} />

          {/* Popular Badge - Animated */}
          {item.isPopular && (
            <div className={`absolute top-3 right-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 transition-all duration-300 shadow-lg ${
              isHovered ? 'scale-110 -translate-y-1' : 'scale-100'
            }`}>
              <Flame size={12} />
              Hot
            </div>
          )}

          {/* Discount Badge */}
          {item.discount ? (
            <div className={`absolute top-3 left-3 bg-yellow-300 text-gray-900 px-3 py-1.5 rounded-full text-xs font-black transition-all duration-300 shadow-lg ${
              isHovered ? 'scale-110 -translate-y-1' : 'scale-100'
            }`}>
              SAVE {item.discount}%
            </div>
          ) : null}
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col p-4">
          {/* Name */}
          <h3 className={`font-bold text-lg line-clamp-2 mb-2 transition-all duration-300 ${
            isHovered 
              ? 'text-red-500 translate-x-1' 
              : 'text-gray-900'
          }`}>
            {item.name}
          </h3>

          {/* Description */}
          {item.description && (
            <p className={`text-xs text-gray-600 line-clamp-2 mb-3 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-80'
            }`}>
              {item.description}
            </p>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Rating */}
          {item.rating && (
            <div className={`flex items-center gap-2 mb-3 transition-all duration-300 ${
              isHovered ? 'translate-x-1' : ''
            }`}>
              <div className="flex items-center gap-0.5 bg-amber-50 px-2.5 py-1 rounded-lg">
                <Star size={13} className="fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-gray-900 text-sm">{item.rating}</span>
              </div>
              <span className="text-xs text-gray-500">({item.reviews})</span>
            </div>
          )}

          {/* Price Section - Premium Style */}
          <div className="mb-4">
            <div className="flex items-end gap-2 mb-2">
              <span className={`font-black text-2xl transition-all duration-300 ${
                isHovered 
                  ? 'text-red-500 text-3xl' 
                  : 'text-gray-900'
              }`}>
                Rp {discountedPrice.toLocaleString('id-ID')}
              </span>
              {item.discount ? (
                <span className="text-xs text-gray-400 line-through">
                  {(item.price / 1000).toFixed(0)}k
                </span>
              ) : null}
            </div>
          </div>

          {/* Add to Cart Button - Interactive */}
          {!showQuantity ? (
            <button
              onClick={handleAddClick}
              className={`w-full font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                isHovered 
                  ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg hover:shadow-xl transform -translate-y-1' 
                  : 'bg-red-50 text-red-500 hover:bg-red-100'
              }`}
            >
              <ShoppingCart size={16} />
              <span>Add to Cart</span>
            </button>
          ) : (
            <div className={`flex gap-2 transition-all duration-300`}>
              {/* Quantity Control */}
              <div className="flex items-center border-2 border-gray-200 rounded-xl bg-gray-50 overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 py-2 text-gray-600 hover:text-red-500 hover:bg-red-50 transition-all"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="px-3 py-2 font-bold text-gray-900 min-w-[2.5rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 py-2 text-gray-600 hover:text-red-500 hover:bg-red-50 transition-all"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Confirm Button */}
              <button
                onClick={handleConfirmAdd}
                className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-xl transition-all hover:shadow-lg active:scale-95"
              >
                Add
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}