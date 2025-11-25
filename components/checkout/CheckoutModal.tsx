'use client';

import { useState } from 'react';
import { X, Clock, Check } from 'lucide-react';

interface CartItem {
  id: string | number;
  name: string;
  price: number;
  discount?: number;
  quantity: number;
}

interface ConfirmPayload {
  paymentMethod: string;
  pickupTime: string;
  total: number;
}

interface CheckoutModalProps {
  cart: CartItem[];
  onClose: () => void;
  onConfirm: (payload: ConfirmPayload) => void;
}

export default function CheckoutModal({ cart, onClose, onConfirm }: CheckoutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<string>('cash');
  const [pickupTime, setPickupTime] = useState<string>('istirahat1');

  // Hitung total
  const total = cart.reduce((sum, item) => {
    const price = item.discount 
      ? item.price - (item.price * item.discount / 100) 
      : item.price;
    return sum + (price * item.quantity);
  }, 0);

  const paymentMethods = [
    { id: 'cash', name: 'Bayar di Tempat', icon: '💵', description: 'Bayar langsung ke kasir' },
    { id: 'qris', name: 'QRIS', icon: '📱', description: 'Scan QR code untuk bayar' },
    { id: 'ewallet', name: 'E-Wallet', icon: '💳', description: 'GoPay, OVO, Dana, ShopeePay' }
  ];

  const pickupTimes = [
    { id: 'istirahat1', name: 'Istirahat 1', time: '09:30 - 10:00' },
    { id: 'istirahat2', name: 'Istirahat 2', time: '12:00 - 12:30' },
    { id: 'pulang', name: 'Pulang Sekolah', time: '15:00 - 15:30' }
  ];

  const handleConfirm = () => {
    onConfirm({ paymentMethod, pickupTime, total });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-gray-800">Checkout</h2>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 rounded-xl transition-all"
          >
            <X color="#000f" size={24} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Pickup Time Section */}
          <div>
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Clock size={20} className="text-orange-500" />
              Waktu Pengambilan
            </h3>
            <div className="space-y-2">
              {pickupTimes.map((time) => (
                <button
                  key={time.id}
                  onClick={() => setPickupTime(time.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    pickupTime === time.id
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-800">{time.name}</div>
                      <div className="text-sm text-gray-500">{time.time}</div>
                    </div>
                    {pickupTime === time.id && (
                      <Check size={20} className="text-orange-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method Section */}
          <div>
            <h3 className="font-bold text-gray-800 mb-3">Metode Pembayaran</h3>
            <div className="space-y-2">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === method.id
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-left">
                      <span className="text-2xl">{method.icon}</span>
                      <div>
                        <div className="font-semibold text-gray-800">{method.name}</div>
                        <div className="text-xs text-gray-500">{method.description}</div>
                      </div>
                    </div>
                    {paymentMethod === method.id && (
                      <Check size={20} className="text-orange-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-2xl p-4 space-y-2">
            <h3 className="font-bold text-gray-800 mb-3">Ringkasan Pesanan</h3>
            {cart.map((item) => {
              const price = item.discount 
                ? item.price - (item.price * item.discount / 100) 
                : item.price;
              return (
                <div key={item.id} className="flex justify-between text-sm text-gray-700">
                  <span className="text-gray-600">
                    {item.name} x{item.quantity}
                  </span>
                  <span className="font-semibold">
                    Rp {(price * item.quantity).toLocaleString()}
                  </span>
                </div>
              );
            })}
            <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between">
              <span className="font-bold text-gray-800">Total</span>
              <span className="font-bold text-xl text-orange-600">
                Rp {total.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleConfirm}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all"
          >
            Konfirmasi Pesanan
          </button>
        </div>
      </div>
    </div>
  );
}