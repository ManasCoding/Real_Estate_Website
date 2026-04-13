import { Whatsapp, X } from '@/icons/landing-page-icons';
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#1b436e] text-white pt-20 pb-10 mt-20">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-20">
        
        {/* Column 1: Opening Hours */}
        <div className="flex flex-col gap-6">
          <h3 className="text-xl font-bold tracking-tight text-white/90">Opening hours</h3>
          <div className="flex flex-col gap-4 text-sm font-medium text-white/60">
            <p>Mon-Fri 08:00AM - 08:00PM</p>
            <p>Sat-Sun 08:00AM - 08:00PM</p>
          </div>
        </div>

        {/* Column 2: Find Us */}
        <div className="flex flex-col gap-6">
          <h3 className="text-xl font-bold tracking-tight text-white/90">Find Us</h3>
          <div className="flex flex-col gap-4 text-sm font-medium text-white/60">
            <p>8911 Tanglewood Ave.<br/>Capitol Heights, MD 20743</p>
            <p>(566) 237-4687</p>
            <p>info@pdrinfra.com</p>
          </div>
        </div>

        {/* Column 3: Property */}
        <div className="flex flex-col gap-6">
          <h3 className="text-xl font-bold tracking-tight text-white/90">Property</h3>
          <ul className="flex flex-col gap-4 text-sm font-medium text-white/60">
            <li><Link to="/listings" className="hover:text-orange-500 transition-colors">Buy or Rent</Link></li>
            <li><Link to="/sell-list" className="hover:text-orange-500 transition-colors">Sell or List</Link></li>
            <li><Link to="/listings" className="hover:text-orange-500 transition-colors">Residential</Link></li>
            <li><Link to="/listings" className="hover:text-orange-500 transition-colors">Commercial</Link></li>
          </ul>
        </div>

        {/* Column 4: Links */}
        <div className="flex flex-col gap-6">
          <h3 className="text-xl font-bold tracking-tight text-white/90">Quick Links</h3>
          <ul className="flex flex-col gap-4 text-sm font-medium text-white/60">
            <li><Link to="/" className="hover:text-orange-500 transition-colors">Home</Link></li>
            <li><Link to="/contact" className="hover:text-orange-500 transition-colors">Contact</Link></li>
            <li><Link to="/login" className="hover:text-orange-500 transition-colors">Login</Link></li>
            <li><Link to="/register" className="hover:text-orange-500 transition-colors">Register</Link></li>
          </ul>
        </div>

        {/* Column 5: Newsletter */}
        <div className="flex flex-col gap-6">
          <h3 className="text-xl font-bold tracking-tight text-white/90">Newsletter</h3>
          <p className="text-sm font-medium text-white/60">Subscribe to our latest real estate updates.</p>
          <div className="relative mt-2">
            <input 
              type="email" 
              placeholder="Your email" 
              className="w-full bg-white/10 rounded-lg py-4 px-4 text-white text-sm outline-none pr-32 border border-white/10 focus:border-orange-500 transition-colors"
            />
            <button className="absolute right-1 top-1 bottom-1 bg-orange-500 hover:bg-orange-600 text-xs font-black uppercase tracking-widest px-6 rounded-md transition-colors text-white">
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="container mx-auto px-6 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-sm font-medium text-white/40">
          ©Copyright PDR Real Estate 2026.
        </p>
        
        <div className="flex gap-4">
          {[ 'fb', 'tw', 'ig', 'tg' ].map((social) => (
            <div key={social} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-orange-500 hover:bg-orange-500/10 transition-all cursor-pointer">
               <div className="w-1 h-1 rounded-full bg-current" />
            </div>
          ))}
        </div>
      </div>
    </footer>
);

};

export default Footer;