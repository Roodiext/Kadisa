'use client';

import categories from '@/data/categories.json';

interface CategoryFilterProps {
  selected: string;
  onSelect: (categoryId: string) => void;
}

export default function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex gap-3 px-4 py-4 overflow-x-auto scrollbar-hide" role="tablist" aria-label="Kategori menu">
      {(categories as { id: string; name: string; icon: string }[]).map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          aria-selected={selected === cat.id}
          role="tab"
          tabIndex={0}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all focus:outline-none focus:ring-2 focus:ring-orange-300 ${
            selected === cat.id
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg scale-105'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span className="text-lg">{cat.icon}</span>
          <span>{cat.name}</span>
        </button>
      ))}
    </div>
  );
}