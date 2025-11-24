'use client';

import { useState, useMemo } from 'react';
import menuData from '@/data/menu.json';

export function useMenu() {
  const [selectedCategory, setSelectedCategory] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default'); // default, price-low, price-high, rating

  // Filter berdasarkan kategori
  const filteredByCategory = useMemo(() => {
    if (selectedCategory === 'semua') {
      return menuData;
    }
    return menuData.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  // Filter berdasarkan search query
  const filteredBySearch = useMemo(() => {
    if (!searchQuery) {
      return filteredByCategory;
    }
    const query = searchQuery.toLowerCase();
    return filteredByCategory.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    );
  }, [filteredByCategory, searchQuery]);

  // Sort hasil
  const sortedMenu = useMemo(() => {
    const items = [...filteredBySearch];
    
    switch (sortBy) {
      case 'price-low':
        return items.sort((a, b) => a.price - b.price);
      case 'price-high':
        return items.sort((a, b) => b.price - a.price);
      case 'rating':
        return items.sort((a, b) => b.rating - a.rating);
      default:
        return items;
    }
  }, [filteredBySearch, sortBy]);

  // Get menu populer
  const popularMenu = useMemo(() => {
    return menuData.filter(item => item.isPopular);
  }, []);

  // Get menu dengan discount
  const discountedMenu = useMemo(() => {
    return menuData.filter(item => item.discount > 0);
  }, []);

  return {
    menu: sortedMenu,
    popularMenu,
    discountedMenu,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy
  };
}