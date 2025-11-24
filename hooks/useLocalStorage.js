'use client';

import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  // State untuk menyimpan value
  const [storedValue, setStoredValue] = useState(initialValue);

  // Flag untuk cek apakah sudah mounted (untuk SSR Next.js)
  const [isInitialized, setIsInitialized] = useState(false);

  // Inisialisasi - ambil data dari localStorage saat component mount
  useEffect(() => {
    try {
      // Cek apakah window tersedia (client-side)
      if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem(key);
        if (item) {
          setStoredValue(JSON.parse(item));
        }
        setIsInitialized(true);
      }
    } catch (error) {
      console.error(`Error loading localStorage key "${key}":`, error);
      setIsInitialized(true);
    }
  }, [key]);

  // Function untuk set value
  const setValue = (value) => {
    try {
      // Allow value to be a function (sama seperti useState)
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Update state
      setStoredValue(valueToStore);
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Function untuk hapus dari localStorage
  const removeValue = () => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, removeValue, isInitialized];
}