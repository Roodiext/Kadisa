'use client';

interface Action {
  icon: string;
  label: string;
  color: string;
}

export default function QuickActions() {
  const actions: Action[] = [
    { icon: '🔥', label: 'Promo', color: 'from-red-400 to-orange-400' },
    { icon: '⭐', label: 'Terpopuler', color: 'from-yellow-400 to-orange-400' },
    { icon: '🆕', label: 'Menu Baru', color: 'from-green-400 to-emerald-400' },
    { icon: '💝', label: 'Favorit', color: 'from-pink-400 to-red-400' }
  ];

  return (
    <div className="grid grid-cols-4 gap-3 px-4 mb-6">
      {actions.map((action, idx) => (
        <button
          key={idx}
          className={`bg-gradient-to-br ${action.color} rounded-2xl p-4 text-white hover:scale-105 transition-transform`}
        >
          <div className="text-3xl mb-2">{action.icon}</div>
          <div className="text-xs font-semibold">{action.label}</div>
        </button>
      ))}
    </div>
  );
}