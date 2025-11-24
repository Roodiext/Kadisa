'use client';

import { X } from 'lucide-react';
import CartItem from './CartItem';

interface CartItemType {
  id: string | number;
  name: string;
  price: number;
  discount?: number;
  quantity: number;
  image?: string;
}

interface CartModalProps {
  cart: CartItemType[];
  onClose: () => void;
  onCheckout: () => void;
  onUpdateQuantity: (id: string | number, quantity: number) => void;
}

export default function CartModal({ cart, onClose, onCheckout, onUpdateQuantity }: CartModalProps) {
  // Hitung total harga
  const total = cart.reduce((sum, item) => {
    const price = item.discount
      ? item.price - (item.price * item.discount / 100)
      : item.price;
    return sum + (price * item.quantity);
  }, 0);

  // Kalau cart kosong
  if (cart.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Keranjang Kosong</h3>
          <p className="text-gray-500 mb-6">Yuk, mulai pesan makanan favoritmu!</p>
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all"
          >
            Mulai Belanja
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Keranjang Belanja</h2>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 rounded-xl transition-all"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
            />
          ))}
        </div>
        
        {/* Footer - Total & Checkout */}
        <div className="border-t p-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Pesanan</span>
            <span className="text-2xl font-bold text-gray-800">
              Rp {total.toLocaleString()}
            </span>
          </div>
          <button
            onClick={onCheckout}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all"
          >
            Lanjut ke Pembayaran
          </button>
        </div>
      </div>
    </div>
  );
}