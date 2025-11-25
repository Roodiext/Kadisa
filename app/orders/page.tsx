 'use client';

import Link from 'next/link';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { formatCurrency } from '@/lib/formatCurrency';

export default function OrdersPage() {
  const [orders] = useLocalStorage('kantin-orders', []);

  const list = Array.isArray(orders) ? orders.slice().reverse() : [];

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Riwayat Pesanan</h1>
          <Link href="/" className="text-sm text-orange-600 font-semibold">Kembali</Link>
        </div>

        {list.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-gray-200">
            <p className="text-gray-700 mb-4 font-medium">Belum ada riwayat pesanan.</p>
            <Link href="/" className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 rounded-xl font-semibold">Pesan Sekarang</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {list.map((order: any) => (
              <div key={order.code} className="bg-white rounded-2xl p-5 border-2 border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-bold text-lg text-gray-900">{order.code}</div>
                    <div className="text-sm text-gray-600 font-medium">{new Date(order.createdAt).toLocaleString('id-ID')}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-xl text-orange-600">{formatCurrency(order.total)}</div>
                    <div className="text-sm text-gray-700 font-medium capitalize">{order.paymentMethod === 'cash' ? 'Tunai' : order.paymentMethod === 'qris' ? 'QRIS' : 'E-Wallet'}</div>
                  </div>
                </div>

                <div className="mt-3 border-t-2 border-gray-200 pt-3">
                  {Array.isArray(order.items) && order.items.length > 0 ? (
                    <ul className="text-sm space-y-2">
                      {order.items.map((it: any) => (
                        <li key={it.id} className="flex justify-between items-center">
                          <span className="text-gray-800 font-medium">{it.name} <span className="text-gray-600">x{it.quantity}</span></span>
                          <span className="font-bold text-orange-600">{formatCurrency((it.discount ? (it.price - (it.price * it.discount / 100)) : it.price) * it.quantity)}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-sm text-gray-600 font-medium">Tidak ada item</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
