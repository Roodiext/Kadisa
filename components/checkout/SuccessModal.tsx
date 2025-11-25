 'use client';

import { Check } from 'lucide-react';
import Link from 'next/link';

interface SuccessModalProps {
  orderCode: string;
  onClose: () => void;
}

export default function SuccessModal({ orderCode, onClose }: SuccessModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center animate-in fade-in zoom-in duration-300">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check size={40} className="text-green-500" />
        </div>
        
        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Pesanan Berhasil!
        </h3>
        <p className="text-gray-500 mb-6">Kode pesanan kamu:</p>
        
        {/* Order Code */}
        <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-6 mb-6">
          <p className="text-4xl font-bold text-orange-600 tracking-wider">
            {orderCode}
          </p>
        </div>
        
        {/* Instructions */}
        <div className="bg-blue-50 rounded-xl p-4 mb-6 text-left">
          <p className="text-sm text-blue-800 font-semibold mb-2">
            📌 Cara Mengambil Pesanan:
          </p>
          <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
            <li>Datang ke kantin sesuai waktu yang dipilih</li>
            <li>Tunjukkan kode pesanan ke kasir</li>
            <li>Lakukan pembayaran sesuai metode yang dipilih</li>
            <li>Ambil pesananmu dan selamat menikmati!</li>
          </ol>
        </div>
        
        <div className="space-y-3">
          <Link href="/orders" onClick={onClose} className="w-full inline-block text-center bg-white border border-orange-500 text-orange-600 font-semibold py-3 rounded-xl hover:bg-orange-50 transition-all">
            Lihat Riwayat
          </Link>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
}