'use client';

import { Clock, MapPin, Timer, TrendingUp } from 'lucide-react';

export default function QuickActions() {
  const infos = [
    {
      icon: Clock,
      title: 'Jam Buka',
      value: '07:00 - 15:00',
      subtitle: 'Senin - Jumat',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-100/50'
    },
    {
      icon: MapPin,
      title: 'Lokasi',
      value: 'Kantin Belakang',
      subtitle: 'Lantai 1 Sekolah',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100/50'
    },
    {
      icon: Timer,
      title: 'Waktu Siap',
      value: '5-10 Menit',
      subtitle: 'Setelah order',
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      border: 'border-orange-100/50'
    },
    {
      icon: TrendingUp,
      title: 'Menu Tersedia',
      value: '20+ Menu',
      subtitle: 'Selalu update',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-100/50'
    }
  ];

  return (
    <div className="px-4 mb-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {infos.map((info, idx) => {
          const Icon = info.icon;
          return (
            <div
              key={idx}
              className={`${info.bg} ${info.border} border-2 rounded-2xl p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group`}
            >
              <div className={`${info.color} mb-3 group-hover:scale-110 transition-transform duration-300 inline-block`}>
                <Icon size={28} strokeWidth={2} />
              </div>
              <div className="text-sm text-gray-600 font-medium mb-1">
                {info.title}
              </div>
              <div className={`text-xl font-bold ${info.color} mb-0.5`}>
                {info.value}
              </div>
              <div className="text-xs text-gray-500">
                {info.subtitle}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}