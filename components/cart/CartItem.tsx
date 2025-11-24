'use client';

import { Minus, Plus } from 'lucide-react';

interface CartItemType {
  id: string | number;
  name: string;
  price: number;
  discount?: number;
  quantity: number;
  image?: string;
}

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string | number, quantity: number) => void;
}

export default function CartItem({ item, onUpdateQuantity }: CartItemProps) {
  // Hitung harga setelah diskon
  const price = item.discount
    ? item.price - (item.price * item.discount / 100)
    : item.price;

  const handleDecrease = () => {
    onUpdateQuantity(item.id, Math.max(0, item.quantity - 1));
  };

  const handleIncrease = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  return (
    <div className="flex gap-4 bg-gray-50 rounded-2xl p-4">
      {/* Image */}
      <img 
        src={item.image ?? '/placeholder.png'} 
        alt={item.name} 
        className="w-20 h-20 object-cover rounded-xl flex-shrink-0" 
      />
      
      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-gray-800 mb-1 truncate">
          {item.name}
        </h3>
        <p className="text-orange-600 font-bold">
          Rp {price.toLocaleString()}
        </p>
        {(item.discount ?? 0) > 0 && (
          <p className="text-xs text-gray-400 line-through">
            Rp {item.price.toLocaleString()}
          </p>
        )}
      </div>
      
      {/* Price & Quantity Control */}
      <div className="flex flex-col items-end justify-between">
        {/* Total Price */}
        <p className="font-bold text-gray-800">
          Rp {(price * item.quantity).toLocaleString()}
        </p>
        
        {/* Quantity Controls */}
        <div className="flex items-center gap-2 bg-white rounded-lg p-1">
          <button
            onClick={handleDecrease}
            className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded transition-all"
          >
            <Minus size={14} />
          </button>
          <span className="font-bold w-6 text-center">
            {item.quantity}
          </span>
          <button
            onClick={handleIncrease}
            className="w-7 h-7 flex items-center justify-center bg-orange-500 text-white rounded hover:bg-orange-600 transition-all"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}