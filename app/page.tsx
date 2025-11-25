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
import Footer from '@/components/layout/Footer';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import menuData from '@/data/menu.json';

interface MenuItem {
  id: string | number;
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

type UseLocalStorageReturn<T> = [T, (value: T | ((prev: T) => T)) => void];

export default function Home() {
  const [cart, setCart] = useLocalStorage('kantin-cart', []) as UseLocalStorageReturn<CartItemType[]>;
  interface OrderType {
    code: string;
    createdAt: string;
    items: CartItemType[];
    total: number;
    paymentMethod: string;
    pickupTime: string;
  }

  const [, setOrders] = useLocalStorage('kantin-orders', []) as UseLocalStorageReturn<OrderType[]>;
  const [selectedCategory, setSelectedCategory] = useState<string>('semua');
  const [showCart, setShowCart] = useState<boolean>(false);
  const [showCheckout, setShowCheckout] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [orderCode, setOrderCode] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const menuItems = menuData as MenuItem[];

  // Filter menu berdasarkan search query
  const searchResults = searchQuery.trim()
    ? menuItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Filter menu berdasarkan kategori (hanya jika tidak ada search)
  const filteredMenu = searchQuery.trim()
    ? searchResults
    : selectedCategory === 'semua'
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
        // Jika item sudah ada, tambahkan quantity
        setCart(cart.map(cartItem =>
          cartItem.id === item.id 
            ? { ...cartItem, quantity: existingItem.quantity + quantity }
            : cartItem
        ));
      } else {
        // Jika item belum ada, tambahkan item baru
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

  // Konfirmasi pesanan (dipanggil dari CheckoutModal dengan payload)
  type ConfirmPayload = { paymentMethod: string; pickupTime: string; total: number };

  const handleConfirmOrder = (payload: ConfirmPayload) => {
    const code = 'K' + Math.random().toString(36).substr(2, 6).toUpperCase();

    const order = {
      code,
      createdAt: new Date().toISOString(),
      items: cart,
      total: payload.total,
      paymentMethod: payload.paymentMethod,
      pickupTime: payload.pickupTime
    };

    // Simpan ke localStorage (riwayat pesanan)
    setOrders((prevOrders: OrderType[] | undefined) => {
      const existing = Array.isArray(prevOrders) ? prevOrders : [];
      return [...existing, order as OrderType];
    });

    setOrderCode(code);
    setShowCheckout(false);
    setShowSuccess(true);
    setCart([]);
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
      <Header cartCount={cartCount} onCartClick={() => setShowCart(true)} searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <main className="pb-20">
        {/* Hero Section - Full Width tanpa padding */}
        <HeroSection />
        
        {/* Konten lainnya dengan max-width container */}
        <div className="max-w-7xl mx-auto">
          <QuickActions />
          
          <div className="px-4">
            <PromoBanner />
          
          {/* Section Menu Populer dengan Carousel */}
          {popularItems.length > 0 && (
            <section className="mb-12">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Menu Populer ⚡</h2>
                <p className="text-sm text-gray-600 mt-1">Paling banyak dipesan minggu ini</p>
              </div>
              <PopularCarousel items={popularItems} onAddToCart={handleAddToCart} />
            </section>
          )}

          <CategoryFilter 
            selected={selectedCategory} 
            onSelect={setSelectedCategory} 
          />
          
          {/* Section Semua Menu atau Search Results */}
          <section className="mb-8">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {searchQuery.trim() ? `Hasil Pencarian: "${searchQuery}"` : 'Semua Menu'}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {searchQuery.trim() 
                  ? `${filteredMenu.length} hasil ditemukan` 
                  : 'Pilih menu favoritmu'}
              </p>
            </div>
            {filteredMenu.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredMenu.map(item => (
                  <MenuCard 
                    key={String(item.id)} 
                    item={item} 
                    onAddToCart={handleAddToCart} 
                    currentQuantity={cart.find(c => c.id === item.id)?.quantity ?? 0}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Tidak ada hasil</h3>
                <p className="text-gray-600">Coba cari dengan kata kunci lain atau jelajahi kategori</p>
              </div>
            )}
          </section>
          </div>
        </div>
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

      <Footer />
    </div>
  );
}
