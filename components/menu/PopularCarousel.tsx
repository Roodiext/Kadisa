"use client";

import { useRef } from 'react';
import MenuCard from './MenuCard';

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

interface PopularCarouselProps {
  items: ItemType[];
  onAddToCart: (item: ItemType, quantity: number) => void;
}

export default function PopularCarousel({ items, onAddToCart }: PopularCarouselProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollByCard = (dir: 'next' | 'prev') => {
    const el = containerRef.current;
    if (!el) return;
    const child = el.querySelector<HTMLElement>('[data-card]');
    const gap = 16; // matches gap-4 (1rem)
    const step = (child ? child.getBoundingClientRect().width : el.clientWidth * 0.8) + gap;
    el.scrollBy({ left: dir === 'next' ? step : -step, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {/* arrows */}
      <button
        aria-label="previous"
        onClick={() => scrollByCard('prev')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 shadow-md rounded-full p-2 ml-2 hover:scale-105 transition-transform"
      >
        ‹
      </button>
      <button
        aria-label="next"
        onClick={() => scrollByCard('next')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 shadow-md rounded-full p-2 mr-2 hover:scale-105 transition-transform"
      >
        ›
      </button>

      {/* horizontal scroll container with peek & snap */}
      <div
        ref={containerRef}
            className="overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory px-4 sm:px-6"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div className="flex gap-4 pb-6 items-stretch">
          {items.map((item) => (
            <div
              key={String(item.id)}
              data-card
              className="snap-start shrink-0 w-64 sm:w-72 md:w-80 lg:w-96"
            >
              <MenuCard
                item={item}
                onAddToCart={onAddToCart}
                className="h-80 sm:h-88 md:h-80 lg:h-96 flex flex-col justify-between"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
