/**
 * Utility functions untuk aplikasi kantin
 */

// Format currency ke Rupiah
export function formatCurrency(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

// Format currency tanpa simbol Rp
export function formatPrice(amount) {
  return amount.toLocaleString('id-ID');
}

// Generate random order code
export function generateOrderCode(prefix = 'K') {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substr(2, 4).toUpperCase();
  return `${prefix}${timestamp}${random}`;
}

// Hitung harga setelah diskon
export function calculateDiscountedPrice(price, discount) {
  if (!discount || discount === 0) return price;
  return price - (price * discount / 100);
}

// Hitung total cart
export function calculateCartTotal(cartItems) {
  return cartItems.reduce((total, item) => {
    const price = calculateDiscountedPrice(item.price, item.discount);
    return total + (price * item.quantity);
  }, 0);
}

// Format date to Indonesian
export function formatDate(date) {
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

// Format time
export function formatTime(date) {
  return new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

// Truncate text
export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// Validate phone number (Indonesian format)
export function isValidPhoneNumber(phone) {
  const phoneRegex = /^(\+62|62|0)[0-9]{9,12}$/;
  return phoneRegex.test(phone);
}

// Get current time slot (untuk jam operasional)
export function getCurrentTimeSlot() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = hours * 60 + minutes;

  // Istirahat 1: 09:30 - 10:00
  const istirahat1Start = 9 * 60 + 30;
  const istirahat1End = 10 * 60;

  // Istirahat 2: 12:00 - 12:30
  const istirahat2Start = 12 * 60;
  const istirahat2End = 12 * 60 + 30;

  // Pulang: 15:00 - 15:30
  const pulangStart = 15 * 60;
  const pulangEnd = 15 * 60 + 30;

  if (currentTime >= istirahat1Start && currentTime <= istirahat1End) {
    return 'istirahat1';
  } else if (currentTime >= istirahat2Start && currentTime <= istirahat2End) {
    return 'istirahat2';
  } else if (currentTime >= pulangStart && currentTime <= pulangEnd) {
    return 'pulang';
  }

  return null; // Kantin tutup
}

// Check apakah kantin buka
export function isKantinOpen() {
  return getCurrentTimeSlot() !== null;
}

// Debounce function untuk search
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Generate initials dari nama
export function getInitials(name) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

// Random color generator (untuk avatar/badge)
export function getRandomColor() {
  const colors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-green-500',
    'bg-blue-500',
    'bg-indigo-500',
    'bg-purple-500',
    'bg-pink-500'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Calculate discount percentage
export function calculateDiscountPercentage(originalPrice, discountedPrice) {
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
}

// Group array by key
export function groupBy(array, key) {
  return array.reduce((result, item) => {
    const group = item[key];
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(item);
    return result;
  }, {});
}

// Shuffle array (untuk random recommendations)
export function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}