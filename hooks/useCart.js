'use client';

import { useLocalStorage } from './useLocalStorage';

export function useCart() {
  const [cart, setCart, removeCart] = useLocalStorage('kantin-cart', []);

  // Tambah item ke cart atau update quantity
  const addToCart = (item, quantity) => {
    if (quantity === 0) {
      // Hapus item kalau quantity 0
      removeFromCart(item.id);
    } else {
      setCart(currentCart => {
        const existingItem = currentCart.find(cartItem => cartItem.id === item.id);
        
        if (existingItem) {
          // Update quantity kalau item sudah ada
          return currentCart.map(cartItem =>
            cartItem.id === item.id 
              ? { ...cartItem, quantity } 
              : cartItem
          );
        } else {
          // Tambah item baru
          return [...currentCart, { ...item, quantity }];
        }
      });
    }
  };

  // Update quantity item di cart
  const updateQuantity = (itemId, quantity) => {
    if (quantity === 0) {
      removeFromCart(itemId);
    } else {
      setCart(currentCart =>
        currentCart.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    }
  };

  // Hapus item dari cart
  const removeFromCart = (itemId) => {
    setCart(currentCart => currentCart.filter(item => item.id !== itemId));
  };

  // Clear semua cart
  const clearCart = () => {
    removeCart();
  };

  // Get item by id
  const getCartItem = (itemId) => {
    return cart.find(item => item.id === itemId);
  };

  // Hitung total items
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Hitung total harga
  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = item.discount 
        ? item.price - (item.price * item.discount / 100) 
        : item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  // Check apakah item ada di cart
  const isInCart = (itemId) => {
    return cart.some(item => item.id === itemId);
  };

  return {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartItem,
    getTotalItems,
    getTotalPrice,
    isInCart
  };
}