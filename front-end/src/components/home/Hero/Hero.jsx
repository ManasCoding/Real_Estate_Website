import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Building, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Senior Architect level Hero component.
 * Implements a high-impact, grid-breaking layout with localized search context.
 * 
 * @component
 */
const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden bg-royal-linen">
      {/* Abstract Background pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Text Content */}
          <motion.div 
            className="flex-1 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-accent text-[10px] font-black uppercase tracking-[0.2em]">Excellence in Bhubaneswar Real Estate</span>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-7xl font-black text-primary mb-8 tracking-tighter leading-[1.05]"
            >
              Find your <span className="italic font-serif text-accent">masterpiece</span> in the Temple City.
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-lg text-muted-foreground/80 mb-12 max-w-2xl font-medium leading-relaxed font-serif italic"
            >
              Curated premium residences in the heart of Odisha. From modern Penthouses in Patia to luxurious family homes in Sahid Nagar.
            </motion.p>

            {/* Premium Search Bar */}
            <motion.div 
              variants={itemVariants}
              className="bg-white p-2 rounded-[1.5rem] shadow-[0_32px_64px_-16px_rgba(15,23,42,0.15)] flex flex-col md:flex-row items-stretch md:items-center gap-2 max-w-4xl border border-slate-100"
            >
              <div className="flex-1 flex items-center gap-4 px-6 py-4 border-r border-slate-50">
                <Home className="text-accent" size={20} />
                <div className="flex flex-col flex-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mb-1">Status</label>
                  <select className="bg-transparent font-black text-primary outline-none text-sm appearance-none cursor-pointer">
                    <option>Buy Prime Property</option>
                    <option>Rent Luxury Suites</option>
                  </select>
                </div>
              </div>

              <div className="flex-1 flex items-center gap-4 px-6 py-4">
                <MapPin className="text-accent" size={20} />
                <div className="flex flex-col flex-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mb-1">Locality</label>
                  <input 
                    type="text" 
                    placeholder="Patia, Sahid Nagar, Jayadev Vihar..." 
                    className="bg-transparent font-black text-primary outline-none text-sm placeholder:text-slate-300 w-full"
                  />
                </div>
              </div>

              <Button size="lg" className="h-16 px-10 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest flex items-center gap-3 transition-all active:scale-95">
                <Search size={18} />
                <span>Search</span>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              variants={itemVariants}
              className="mt-16 flex flex-wrap justify-center lg:justify-start gap-12"
            >
              <div className="flex flex-col">
                <span className="text-3xl font-black text-primary">15+</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Years of Legacy</span>
              </div>
              <div className="h-12 w-[1px] bg-slate-200" />
              <div className="flex flex-col">
                <span className="text-3xl font-black text-primary">850+</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Elite Listings</span>
              </div>
              <div className="h-12 w-[1px] bg-slate-200" />
              <div className="flex flex-col">
                <span className="text-3xl font-black text-primary">9.5k</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Happy Residents</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual Side (Grid Breaking) */}
          <motion.div 
            className="flex-1 relative hidden lg:block"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative aspect-square max-w-[500px] ml-auto">
              {/* Floating Element 1 */}
              <motion.div 
                className="absolute -top-10 -left-10 w-64 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl z-20 border-4 border-white"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600" alt="Bhubaneswar Lifestyle" className="w-full h-full object-cover" />
              </motion.div>

              {/* Main Image */}
              <div className="w-full h-full rounded-full overflow-hidden border-8 border-white shadow-2xl relative z-10">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800" alt="Luxury Property" className="w-full h-full object-cover" />
              </div>

              {/* Floating Element 2 */}
              <motion.div 
                className="absolute -bottom-10 -right-10 px-8 py-6 bg-white rounded-2xl shadow-2xl z-20 flex items-center gap-4 border border-slate-50"
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="bg-royal-gold/10 p-3 rounded-xl">
                  <Building className="text-royal-gold" size={24} />
                </div>
                <div>
                  <div className="text-sm font-black text-primary">Certified Premium</div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">RERA Verified</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
