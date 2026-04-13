import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BuildingIcon, HamburgerIcon } from '@/icons/landing-page-icons';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { text: 'Home', href: '/' },
  { text: 'Property', href: '/buy-rent' },
  { text: 'About us', href: '#' },
  { text: 'Contact us', href: '/contact' },
  { text: 'Blog', href: '#' }
];

export default function GlobalHeader() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
    window.location.reload();
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-white shadow-sm border-b border-gray-100 py-1">
      {/* Top Thin Action Bar (Optional, but matching image style) */}
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center bg-white">
        <Link to={'/'} className="group shrink-0">
          <div className="flex items-center cursor-pointer">
            <div className="bg-orange-500/10 p-2 rounded-xl">
              <BuildingIcon className="text-orange-500 h-7 w-7" />
            </div>
            <div className="flex flex-col ml-3">
              <span className="text-2xl font-black uppercase tracking-tighter text-[#1b436e] leading-none">
                PDR
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                Real Estate & Infra
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Links - Centered */}
        <div className="hidden lg:flex items-center space-x-10 absolute left-1/2 -translate-x-1/2">
          {links.map(({ text, href }) => (
            <Link
              to={href}
              className="text-[#1b436e] font-bold text-sm hover:text-orange-500 transition-colors duration-300"
              key={text}
            >
              {text}
            </Link>
          ))}
        </div>

        {/* User Actions & Contact */}
        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-[#1b436e]">{user.name}</span>
                <Button onClick={handleLogout} variant="ghost" className="text-xs font-bold text-gray-500 hover:text-orange-500 transition-colors">Logout</Button>
              </div>
            ) : (
                <Link to="/login" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-orange-500/5 transition-colors">
                        <svg className="w-4 h-4 text-gray-600 group-hover:text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    </div>
                    <span className="text-sm font-bold text-[#1b436e] group-hover:text-orange-500 transition-colors">Login/ Sign up</span>
                </Link>
            )}
            
            <div className="flex items-center gap-2 border-l border-gray-200 pl-6 h-6">
                <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span className="text-sm font-bold text-[#1b436e]">(257) 388-6895</span>
            </div>
          </div>

          <button 
            onClick={() => setIsNavOpen(!isNavOpen)} 
            className="lg:hidden p-2 rounded-lg bg-gray-50 text-orange-500 hover:bg-orange-100"
          >
            <HamburgerIcon className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isNavOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-b border-gray-100 overflow-hidden"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {links.map(({ text, href }) => (
                <Link
                  to={href}
                  key={text}
                  className="text-gray-600 font-medium hover:text-orange-500 py-2 text-lg"
                  onClick={() => setIsNavOpen(false)}
                >
                  {text}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-100 mt-2">
                {user ? (
                   <div className="flex flex-col gap-4">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-400 uppercase">Logged in as</span>
                        <span className="text-lg font-bold text-orange-500">{user.name}</span>
                      </div>
                      <Button onClick={handleLogout} className="w-full justify-center bg-gray-100 text-gray-600 rounded-xl py-6 font-bold">
                        Logout
                      </Button>
                   </div>
                ) : (
                  <Button asChild className="w-full justify-center bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-6 font-bold shadow-lg shadow-orange-500/20">
                    <Link to="/login" onClick={() => setIsNavOpen(false)}>Log in</Link>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
