'use client';

import { useEffect, useRef, useState } from 'react';
import { ShoppingBag, CreditCard, PackageCheck, Sparkles } from 'lucide-react';

export default function PromoBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (bannerRef.current) {
        const rect = bannerRef.current.getBoundingClientRect();
        const scrollProgress = (window.innerHeight - rect.top) / window.innerHeight;
        setScrollY(Math.max(0, Math.min(1, scrollProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const steps = [
    {
      number: '01',
      title: 'Pilih Menu',
      description: 'Cari dan pilih makanan atau minuman favoritmu',
      icon: Sparkles,
      gradient: 'from-violet-600 to-purple-600'
    },
    {
      number: '02',
      title: 'Tambah ke Keranjang',
      description: 'Klik tombol tambah dan atur jumlah pesanan',
      icon: ShoppingBag,
      gradient: 'from-blue-600 to-cyan-600'
    },
    {
      number: '03',
      title: 'Pilih Pembayaran',
      description: 'Pilih metode pembayaran yang kamu suka',
      icon: CreditCard,
      gradient: 'from-orange-600 to-amber-600'
    },
    {
      number: '04',
      title: 'Ambil Pesanan',
      description: 'Tunjukkan kode pesanan dan ambil makananmu',
      icon: PackageCheck,
      gradient: 'from-emerald-600 to-teal-600'
    }
  ];

  return (
    <div className="px-4 mb-12 mt-8" ref={bannerRef}>
      {/* Main Container */}
      <div className="relative bg-gradient-to-br from-orange-600 to-red-700 rounded-3xl overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div 
            className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
            style={{
              transform: `translate(${scrollY * 50}px, ${scrollY * 30}px) scale(${1 + scrollY * 0.2})`
            }}
          ></div>
          <div 
            className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500 rounded-full blur-3xl"
            style={{
              transform: `translate(${-scrollY * 40}px, ${-scrollY * 20}px) scale(${1 + scrollY * 0.15})`
            }}
          ></div>
        </div>

        <div className="rel ative z-10 p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-white/90 mb-4 border border-white/20">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span>Cara Pemesanan</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Pesan Makanan<br />Jadi Mudah
            </h2>
            <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto">
              Ikuti 4 langkah sederhana untuk menikmati makanan favoritmu
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const opacity = Math.max(0, Math.min(1, (scrollY - index * 0.15) * 2));
              const translateY = Math.max(0, 30 - scrollY * 60);

              return (
                <div
                  key={index}
                  className="relative group"
                  style={{
                    opacity: opacity,
                    transform: `translateY(${translateY}px)`,
                    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  {/* Connection Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-white/30 to-transparent -translate-x-1/2 z-0">
                      <div 
                        className="h-full bg-gradient-to-r from-white/60 to-transparent origin-left"
                        style={{
                          transform: `scaleX(${opacity})`,
                          transition: 'transform 0.8s ease-out'
                        }}
                      ></div>
                    </div>
                  )}

                  {/* Card */}
                  <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
                    {/* Number Badge */}
                    <div className="absolute -top-3 -left-3 w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg font-bold text-slate-900">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className={`w-14 h-14 bg-gradient-to-br ${step.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed">
                      {step.description}
                    </p>

                    {/* Glow Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300 blur-xl`}></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center">
            <button className="group relative inline-flex items-center gap-3 bg-white text-slate-900 font-bold px-8 py-4 rounded-xl overflow-hidden hover:shadow-2xl transition-all">
              <span className="relative z-10">Mulai Pesan Sekarang</span>
              <svg 
                className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
                
            </button>
          </div>
        </div>

        {/* Bottom Border Accent */}
       
      </div>
    </div>
  );
}