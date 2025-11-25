'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Diskon Hingga 25%",
    subtitle: "Promo Spesial",
    description: "Untuk pemesanan hari ini!",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=600&fit=crop",
    ctaText: "Pesan Sekarang"
  },
  {
    id: 2,
    title: "Menu Baru Setiap Hari",
    subtitle: "Fresh Daily",
    description: "Coba menu spesial kami hari ini",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&h=600&fit=crop",
    ctaText: "Lihat Menu"
  },
  {
    id: 3,
    title: "Gratis Ongkir ke Kelas",
    subtitle: "Super Fast",
    description: "Pesan sekarang, ambil saat istirahat",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=600&fit=crop",
    ctaText: "Order Now"
  },
  {
    id: 4,
    title: "Beli 2 Gratis 1",
    subtitle: "Flash Sale",
    description: "Khusus minuman pilihan",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=1200&h=600&fit=crop",
    ctaText: "Ambil Promo"
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, currentSlide]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Slides Container */}
      <div className="relative h-[500px] md:h-[600px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentSlide 
                ? 'opacity-100 scale-100 z-10' 
                : 'opacity-0 scale-105 z-0'
            }`}
          >
            {/* Background Image dengan Overlay */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>
            </div>

            {/* Content - Positioned at Bottom Left */}
            <div className="absolute bottom-28 left-0 right-0 z-10 px-6 md:px-12">
              <div className="max-w-7xl mx-auto">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 px-5 py-2 rounded-full text-sm font-bold mb-4 text-white shadow-lg animate-pulse">
                  <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
                  <span>{slide.subtitle}</span>
                </div>

                {/* Title with animation */}
                <h2 className="text-4xl md:text-6xl font-bold mb-3 max-w-2xl text-white drop-shadow-2xl leading-tight">
                  {slide.title}
                </h2>

                {/* Description */}
                <p className="text-white/90 text-lg md:text-xl mb-6 max-w-md">
                  {slide.description}
                </p>

                {/* CTA Button */}
                <button className="group relative bg-white text-orange-600 font-bold px-8 py-4 rounded-xl overflow-hidden hover:shadow-2xl transition-all">
                  <span className="relative z-10 flex items-center gap-2">
                    {slide.ctaText}
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                  <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    {slide.ctaText} →
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/40 transition-all hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/40 transition-all hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all ${
              index === currentSlide
                ? 'w-10 bg-white'
                : 'w-3 bg-white/50 hover:bg-white/70'
            } h-3 rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Curved Bottom Transition */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
        <svg viewBox="0 0 1440 100" className="w-full h-16 md:h-24" preserveAspectRatio="none">
          <path 
            d="M0,50 Q360,0 720,50 T1440,50 L1440,100 L0,100 Z" 
            fill="rgb(249, 250, 251)"
          />
        </svg>
      </div>
    </div>
  );
}