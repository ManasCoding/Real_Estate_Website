import React from 'react';
import { motion } from 'framer-motion';
import { Award, Building2, Briefcase, TrendingUp, ShieldCheck, Target, Compass } from 'lucide-react';
import Navbar from '../components/layout/Navbar/Navbar';
import Footer from '../components/layout/Footer/Footer';

/**
 * Senior Architect level About Page.
 * Focuses on brand storytelling, heritage, and strategic pillars.
 * Uses a dominant Royal Black & Royal Blue monochromatic aesthetic.
 */
export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const pillars = [
    {
      title: 'Residential Elite',
      desc: 'Sourcing the finest villas, penthouses, and sanctuaries across Bhubaneswar.',
      icon: <Building2 className="text-royal-accent" size={24} />
    },
    {
      title: 'Commercial Strategy',
      desc: 'Expert guidance for high-yield retail and office spaces in prime transit corridors.',
      icon: <Briefcase className="text-royal-accent" size={24} />
    },
    {
      title: 'Asset Valuation',
      desc: 'Data-driven market analysis ensuring your property is priced for excellence.',
      icon: <TrendingUp className="text-royal-accent" size={24} />
    },
    {
      title: 'Legal Consultancy',
      desc: 'Comprehensive RERA compliance and documentation support for peace of mind.',
      icon: <ShieldCheck className="text-royal-accent" size={24} />
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white selection:bg-accent selection:text-white font-sans">
      <Navbar />

      <main className="flex-grow">
        {/* 1. Hero Section - The Moto */}
        <section className="relative pt-40 pb-24 md:pt-48 md:pb-32 overflow-hidden bg-royal-linen">
          <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
            <svg width="100%" height="100%">
              <pattern id="grid-about" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid-about)" />
            </svg>
          </div>

          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="max-w-4xl mx-auto"
            >
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full mb-8">
                <Award size={14} className="text-royal-accent" />
                <span className="text-primary text-[10px] font-black uppercase tracking-[0.2em]">Our Founding Principles</span>
              </motion.div>

              <motion.h1 variants={itemVariants} className="text-5xl md:text-8xl font-black text-primary mb-12 tracking-tighter leading-[0.95]">
                Building <span className="italic font-serif text-royal-accent">Legacies</span>, <br/>
                One Home at a Time.
              </motion.h1>

              <motion.p variants={itemVariants} className="text-xl md:text-2xl text-muted-foreground/80 font-serif italic max-w-2xl mx-auto leading-relaxed">
                "Excellence in every square foot, transparency in every transaction."
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* 2. Heritage & Legacy - Dark Section */}
        <section className="py-24 md:py-32 bg-royal-black text-white relative overflow-hidden">
           <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 right-0 w-[800px] h-[1px] bg-white transform rotate-45 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-[600px] h-[1px] bg-white transform -rotate-45 -translate-x-1/2" />
           </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
                  <div className="aspect-square max-w-[500px] rounded-[3rem] overflow-hidden shadow-2xl skew-y-1">
                     <img 
                      src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800" 
                      alt="PDR Heritage" 
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                     />
                  </div>
               </motion.div>

               <div>
                  <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">
                    A Legacy carved in <span className="italic font-serif text-royal-accent">Stone.</span>
                  </h2>
                  <p className="text-slate-400 text-lg leading-relaxed mb-8">
                    Since our inception, PDR Real Estate has been more than a brokerage; it has 
                    been a guardian of Bhubaneswar’s architectural evolution. We were founded 
                    on the belief that real estate is the most personal investment a human can make.
                  </p>
                  <p className="text-slate-400 text-lg leading-relaxed mb-12">
                     Over the decades, we have handled the city's most prestigious transactions, 
                     always prioritizing the narrative of the home as much as the value of the land. 
                  </p>
                  
                  <div className="flex items-center gap-12">
                     <div className="flex flex-col">
                        <span className="text-4xl font-black text-white">$1.2B+</span>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Asset Value Managed</span>
                     </div>
                     <div className="flex flex-col">
                        <span className="text-4xl font-black text-white">15+</span>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Years of Heritage</span>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* 3. Commitment Section */}
        <section className="py-24 bg-royal-linen">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <motion.div 
                 whileHover={{ y: -5 }}
                 className="p-12 rounded-[3.5rem] bg-royal-black text-white border border-white/5 transition-all duration-500 shadow-2xl"
               >
                  <Target className="text-royal-accent mb-8" size={32} />
                  <h4 className="text-3xl font-black mb-4 tracking-tighter">For Discerning Buyers</h4>
                  <p className="text-slate-400 leading-relaxed text-lg">
                    Access exclusive off-market listings and modern sanctuaries that perfectly 
                    match your ambition.
                  </p>
               </motion.div>

               <motion.div 
                 whileHover={{ y: -5 }}
                 className="p-12 rounded-[3.5rem] bg-royal-black text-white border border-white/5 transition-all duration-500 shadow-2xl"
               >
                  <Compass className="text-royal-accent mb-8" size={32} />
                  <h4 className="text-3xl font-black mb-4 tracking-tighter">For Elite Sellers</h4>
                  <p className="text-slate-400 leading-relaxed text-lg">
                    Showcase your legacy properties through sophisticated global marketing strategies.
                  </p>
               </motion.div>
            </div>
          </div>
        </section>

        {/* 4. Service Pillars */}
        <section className="py-24 bg-royal-black text-white">
           <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                 {pillars.map((pillar, idx) => (
                   <div key={idx} className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-royal-accent/30 transition-all duration-500">
                      <div className="mb-6">{pillar.icon}</div>
                      <h4 className="text-lg font-black text-white mb-3">{pillar.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{pillar.desc}</p>
                   </div>
                 ))}
              </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
