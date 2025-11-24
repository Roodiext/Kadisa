'use client';

export default function PromoBanner() {
  return (
    <div className="px-4 mb-6">
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-3xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-1">⚡ Flash Sale</p>
              <h3 className="text-2xl font-bold mb-1">Beli 2 Gratis 1</h3>
              <p className="text-sm opacity-90">Khusus minuman pilihan</p>
            </div>
            <button className="bg-white text-purple-600 font-bold px-5 py-2 rounded-xl hover:shadow-lg transition-all">
              Lihat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}