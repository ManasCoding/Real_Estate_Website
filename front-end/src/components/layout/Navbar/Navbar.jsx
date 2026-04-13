import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

/**
 * Senior-level Header/Navbar component.
 * Implements sophisticated scroll logic, blurred glass effects, and mobile interactions.
 * 
 * @component
 */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Property', path: '/listings' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Blog Page', path: '/' }, // Placeholder pointing to home
  ];

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={`
      fixed top-0 left-0 right-0 z-[100] transition-all duration-500
      ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-sm py-3' : 'bg-transparent py-6'}
    `}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-3">
          <div className="bg-primary p-2 rounded-xl transition-transform duration-300 group-hover:scale-110 shadow-lg shadow-primary/20">
            <Building2 className="text-white h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter text-primary leading-none">PDR</span>
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-accent leading-none mt-1">Real Estate</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`
                text-xs font-black uppercase tracking-widest transition-all duration-300 relative py-2
                text-primary hover:text-accent
                after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] 
                after:bg-accent after:transition-all after:duration-300 hover:after:w-full
              `}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-8 border-l border-slate-200 pl-8 ml-8">
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 mb-1">Consultation</span>
            <div className="flex items-center gap-2 text-primary font-black text-sm">
              <Phone size={14} className="text-accent" />
              <span>+91 (257) 388-6895</span>
            </div>
          </div>
          
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest px-8 rounded-full transition-all active:scale-95">
            <Link to="/login">Login / Sign Up</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-primary hover:bg-slate-100 rounded-xl transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-slate-50 p-6 lg:hidden flex flex-col gap-6"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-lg font-black text-primary hover:text-accent tracking-tight"
              >
                {link.name}
              </Link>
            ))}
            <div className="h-[1px] bg-slate-100" />
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase text-muted-foreground mb-1">Expert Support</span>
                <span className="text-primary font-black">+91 (257) 388-6895</span>
              </div>
              <Button asChild className="rounded-full px-8">
                <Link to="/login">Login</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
