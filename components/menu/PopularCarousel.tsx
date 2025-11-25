"use client";

import { useRef, useState, useEffect } from 'react';
import MenuPopulerCard from './MenuPopulerCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isCarouselVisible, setIsCarouselVisible] = useState(false);

  // Scroll reveal untuk carousel - bisa diulang
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Animasi terjadi ketika carousel masuk viewport
        if (entry.isIntersecting) {
          setIsCarouselVisible(true);
        } else {
          // Reset animasi ketika carousel keluar viewport
          setIsCarouselVisible(false);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }

    return () => {
      if (carouselRef.current) {
        observer.unobserve(carouselRef.current);
      }
    };
  }, []);

  const checkScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      
      return () => {
        container.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [items]);

  const scrollByCard = (dir: 'next' | 'prev') => {
    const el = containerRef.current;
    if (!el) return;
    
    const child = el.querySelector<HTMLElement>('[data-card]');
    const gap = 16;
    const scrollAmount = child 
      ? child.getBoundingClientRect().width + gap
      : el.clientWidth * 0.8;
    
    el.scrollBy({ 
      left: dir === 'next' ? scrollAmount : -scrollAmount, 
      behavior: 'smooth' 
    });

    setTimeout(checkScroll, 300);
  };

  return (
    <div 
      ref={carouselRef}
      className={`w-full transition-all duration-1500 ease-out ${
        isCarouselVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="relative group">
        {/* Left Button */}
        <button
          aria-label="Scroll carousel left"
          onClick={() => scrollByCard('prev')}
          disabled={!canScrollLeft}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 rounded-full p-2 ml-2 transition-all duration-300 ${
            canScrollLeft
              ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg hover:shadow-xl hover:scale-110 cursor-pointer'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <ChevronLeft size={20} />
        </button>

        {/* Right Button */}
        <button
          aria-label="Scroll carousel right"
          onClick={() => scrollByCard('next')}
          disabled={!canScrollRight}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 rounded-full p-2 mr-2 transition-all duration-300 ${
            canScrollRight
              ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg hover:shadow-xl hover:scale-110 cursor-pointer'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <ChevronRight size={20} />
        </button>

        {/* Carousel Container */}
        <div
          ref={containerRef}
          className="overflow-x-auto scroll-smooth snap-x snap-mandatory px-4 sm:px-6 py-4"
          style={{ 
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          onScroll={checkScroll}
        >
          <style>{`
            div[style*="scrollbarWidth"] {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            div[style*="scrollbarWidth"]::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div className="flex gap-4 pb-2">
            {items.map((item, index) => (
              <div
                key={String(item.id)}
                data-card
                className="snap-start shrink-0 w-56 sm:w-64 md:w-72 transition-all duration-300 hover:z-10"
                style={{
                  animation: isCarouselVisible
                    ? `slideInUp 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.15}s both`
                    : 'none',
                }}
              >
                <MenuPopulerCard item={item} onAddToCart={onAddToCart} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={`flex justify-center gap-2 mt-4 transition-all duration-1000 ${
        isCarouselVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4'
      }`}>
        <div className="h-1 bg-gray-200 rounded-full flex-1 max-w-xs">
          <div
            className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full transition-all duration-300"
            style={{
              width: containerRef.current
                ? `${(containerRef.current.scrollLeft / (containerRef.current.scrollWidth - containerRef.current.clientWidth)) * 100}%`
                : '0%',
            }}
          />
        </div>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
