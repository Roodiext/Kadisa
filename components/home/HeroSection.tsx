'use client';
import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let lastScroll = 0;
    let rafId: number | null = null;

    const onScroll = () => {
      lastScroll = window.scrollY;
      if (rafId == null) {
        rafId = window.requestAnimationFrame(() => {
          const val = lastScroll;
          if (bgRef.current) {
            // move background shapes slightly for parallax
            bgRef.current.style.transform = `translateY(${val * 0.12}px)`;
          }
          rafId = null;
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={heroRef} className="relative overflow-hidden">
      <div ref={bgRef} className="bg-gradient-to-br from-orange-400 via-red-400 to-pink-400 text-white px-4 py-10 sm:py-12 rounded-3xl mx-4 my-6 relative overflow-hidden transition-transform duration-500 will-change-transform">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -ml-16 -mb-16"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-semibold mb-3">
            🎉 Promo Spesial
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3">Diskon Hingga 25%</h2>
          <p className="text-white/90 mb-6 text-sm sm:text-base">Untuk pemesanan hari ini!</p>
          <div className="flex items-center justify-center gap-4">
            <button className="bg-white text-orange-600 font-bold px-6 py-3 rounded-xl hover:shadow-lg transition-all">
              Pesan Sekarang →
            </button>
            <button className="bg-white/20 text-white px-4 py-3 rounded-xl hover:bg-white/30 transition-all hidden sm:inline">Lihat Promo</button>
          </div>
        </div>
      </div>

      {/* sentinel for header to observe */}
      <div id="hero-sentinel" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1 }} />
    </section>
  );
}