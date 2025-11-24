'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/home/HeroSection';
import QuickActions from '@/components/home/QuickActions';
import PromoBanner from '@/components/home/PromoBanner';
import CategoryFilter from '@/components/home/CategoryFilter';
import MenuCard from '@/components/menu/MenuCard';
import PopularCarousel from '@/components/menu/PopularCarousel';
import CartModal from '@/components/cart/CartModal';
import CheckoutModal from '@/components/checkout/CheckoutModal';
import SuccessModal from '@/components/checkout/SuccessModal';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import menuData from '@/data/menu.json';

interface MenuItem {
  id: string | number; // allow number from JSON as well as string
  name: string;
  description?: string;
  price: number;
  discount?: number;
  image?: string;
  category?: string;
  isPopular?: boolean;
  rating?: number;
  reviews?: number;
}

interface CartItemType extends MenuItem {
  quantity: number;
}

interface ConfirmPayload {
  paymentMethod: string;
  pickupTime: string;
  total: number;
}

// local helper type for asserted hook return
type UseLocalStorageReturn<T> = [T, (value: T | ((prev: T) => T)) => void];

export default function Home() {
  // assert the hook return type instead of using a generic (hook expects no type args)
  const [cart, setCart] = useLocalStorage('kantin-cart', []) as UseLocalStorageReturn<CartItemType[]>;
  const [selectedCategory, setSelectedCategory] = useState<string>('semua');
  const [showCart, setShowCart] = useState<boolean>(false);
  const [showCheckout, setShowCheckout] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [orderCode, setOrderCode] = useState<string>('');

  const menuItems = menuData as MenuItem[];

  // Filter menu berdasarkan kategori
  const filteredMenu = selectedCategory === 'semua'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  // Menu populer
  const popularItems = menuItems.filter(item => item.isPopular);

  // Add/Update item di cart
  const handleAddToCart = (item: MenuItem, quantity: number) => {
    if (quantity === 0) {
      setCart(cart.filter(cartItem => cartItem.id !== item.id));
    } else {
      const existingItem = cart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        setCart(cart.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, quantity } : cartItem
        ));
      } else {
        setCart([...cart, { ...item, quantity }]);
      }
    }
  };

  // Update quantity di cart modal
  const handleUpdateQuantity = (itemId: string | number, quantity: number) => {
    if (quantity === 0) {
      setCart(cart.filter(item => item.id !== itemId));
    } else {
      setCart(cart.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      ));
    }
  };

  // Ke halaman checkout
  const handleCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
  };

  // Konfirmasi pesanan - menerima payload dari CheckoutModal
  const handleConfirmOrder = () => {
    const code = 'K' + Math.random().toString(36).substr(2, 6).toUpperCase();
    setOrderCode(code);
    setShowCheckout(false);
    setShowSuccess(true);
    setCart([]);
    // bisa gunakan _payload jika diperlukan, mis: _payload?.total
  };

  // Close success modal
  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setOrderCode('');
  };

  // Hitung total item di cart
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartCount={cartCount} onCartClick={() => setShowCart(true)} />
      
      <main className="max-w-7xl mx-auto pb-20">
        <HeroSection />
        
        <QuickActions />
        
        <PromoBanner />
        
       
        
        {/* Section Menu Populer */}
        <section className="mb-8">
          <div className="px-4 mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Menu Populer ⚡</h2>
              <p className="text-sm text-gray-500">Paling banyak dipesan minggu ini</p>
            </div>
            <button className="text-orange-600 font-semibold text-sm hover:text-orange-700 transition-colors">
              Lihat Semua →
            </button>
          </div>
          <div className="px-4">
            <PopularCarousel items={popularItems} onAddToCart={handleAddToCart} />
          </div>
        </section>

         <CategoryFilter 
          selected={selectedCategory} 
          onSelect={setSelectedCategory} 
        />
        
        {/* Section Semua Menu */}
        <section className="mb-8">
          <div className="px-4 mb-4">
            <h2 className="text-xl font-bold text-gray-800">Semua Menu</h2>
            <p className="text-sm text-gray-500">Pilih menu favoritmu</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
            {filteredMenu.map(item => (
              <MenuCard 
                key={String(item.id)} 
                item={item} 
                onAddToCart={handleAddToCart} 
              />
            ))}
          </div>
        </section>
      </main>

      {/* Modals */}
      {showCart && (
        <CartModal
          cart={cart}
          onClose={() => setShowCart(false)}
          onCheckout={handleCheckout}
          onUpdateQuantity={handleUpdateQuantity}
        />
      )}

      {showCheckout && (
        <CheckoutModal
          cart={cart}
          onClose={() => setShowCheckout(false)}
          onConfirm={handleConfirmOrder}
        />
      )}

      {showSuccess && (
        <SuccessModal 
          orderCode={orderCode} 
          onClose={handleCloseSuccess} 
        />
      )}
    </div>
  );
}