import React from 'react'
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'

function Footer() {
  return (
    <footer className='bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-[60px]'>
      {/* Main Footer */}
      <div className='max-w-7xl mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-8'>
          {/* Brand */}
          <div>
            <div className='flex items-center gap-3 mb-4'>
              <img src="/img/xing.png" alt="KADISA Logo" className="w-10 h-10 object-contain" />
              <div>
                <h3 className='text-lg font-bold'>KADISA</h3>
                <p className='text-xs text-orange-100'>Kantin Digital Viska</p>
              </div>
            </div>
            <p className='text-sm text-orange-100 leading-relaxed'>Platform pemesanan makanan dan minuman untuk siswa sekolah dengan mudah dan cepat.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='font-bold text-lg mb-4'>Menu</h4>
            <ul className='space-y-2 text-sm text-orange-100'>
              <li><a href="#" className='hover:text-white transition'>Makanan</a></li>
              <li><a href="#" className='hover:text-white transition'>Minuman</a></li>
              <li><a href="#" className='hover:text-white transition'>Promo</a></li>
              <li><a href="#" className='hover:text-white transition'>Pesanan Saya</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className='font-bold text-lg mb-4'>Hubungi Kami</h4>
            <ul className='space-y-3 text-sm text-orange-100'>
              <li className='flex items-center gap-2'>
                <Phone size={16} />
                <span>+62 812 3456 7890</span>
              </li>
              <li className='flex items-center gap-2'>
                <Mail size={16} />
                <span>info@kadisa.id</span>
              </li>
              <li className='flex items-center gap-2'>
                <MapPin size={16} />
                <span>Jl Rajawali No 123</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className='font-bold text-lg mb-4'>Ikuti Kami</h4>
            <div className='flex gap-3'>
              <a href="#" className='bg-white/20 p-3 rounded-lg hover:bg-white/30 transition'>
                <Facebook size={18} />
              </a>
              <a href="#" className='bg-white/20 p-3 rounded-lg hover:bg-white/30 transition'>
                <Instagram size={18} />
              </a>
              <a href="#" className='bg-white/20 p-3 rounded-lg hover:bg-white/30 transition'>
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className='border-t border-white/20 pt-8 mt-8'></div>

        {/* Bottom Footer */}
        <div className='flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-orange-100'>
          <p>© 2025 KADISA. All rights reserved.</p>
          <p>Made with by VinoSus Dev & Roodiext Production</p>
          <div className='flex gap-4'>
            <a href="#" className='hover:text-white transition'>Privacy Policy</a>
            <a href="#" className='hover:text-white transition'>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer