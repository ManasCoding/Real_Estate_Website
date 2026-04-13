import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, MessageSquare, Linkedin, Instagram, Twitter, ChevronDown } from 'lucide-react';
import Navbar from '../components/layout/Navbar/Navbar';
import Footer from '../components/layout/Footer/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

/**
 * Senior Architect level Contact Page.
 * Focuses on utility, support, and direct transaction inquiry.
 * Uses the Royal Blue & Black monochromatic palette.
 */
export default function ContactPage() {
  const faqs = [
    {
      q: "How can I schedule a private viewing?",
      a: "Private viewings can be scheduled via the form below or by calling nuestra concierge line. We prioritize discretion and flexible scheduling for our elite clientele."
    },
    {
      q: "Do you handle international property acquisitions?",
      a: "Yes. PDR Global provides strategic advisory for international buyers looking to invest in Bhubaneswar's premium real estate market."
    },
    {
      q: "What is your average closure timeline?",
      a: "Timelines vary by asset class. However, our strategic network usually facilitates premium residential closures within 45-60 days."
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-royal-linen selection:bg-royal-accent selection:text-white font-sans overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        {/* 1. Contact Hero */}
        <section className="container mx-auto px-6 mb-20">
          <div className="max-w-4xl">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-black text-royal-black uppercase tracking-tighter mb-8"
            >
              Reach <span className="text-royal-accent italic font-serif">Out.</span>
            </motion.h1>
            <p className="text-xl md:text-2xl text-slate-500 font-serif italic max-w-2xl leading-relaxed">
               For inquiries regarding elite listings, architectural consultancy, or strategic asset management.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column: Info & FAQ */}
            <div className="lg:col-span-5 space-y-16">
               <div className="space-y-12">
                  <div className="flex gap-6 group">
                     <div className="w-14 h-14 rounded-2xl bg-royal-black flex items-center justify-center border border-white/5 shadow-2xl shrink-0">
                        <MapPin className="text-royal-accent" size={24} />
                     </div>
                     <div>
                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Headquarters</h4>
                        <p className="text-xl font-bold text-royal-black leading-tight">
                           PDR Tower, DLF Cyber City,<br/>
                           Patia, Bhubaneswar, 751024
                        </p>
                     </div>
                  </div>

                  <div className="flex gap-6 group">
                     <div className="w-14 h-14 rounded-2xl bg-royal-black flex items-center justify-center border border-white/5 shadow-2xl shrink-0">
                        <Clock className="text-royal-accent" size={24} />
                     </div>
                     <div>
                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Advisory Hours</h4>
                        <p className="text-xl font-bold text-royal-black">
                           Mon — Sat: 09:00 - 20:00<br/>
                           Sunday: By Appointment
                        </p>
                     </div>
                  </div>
               </div>

               {/* Modern FAQ */}
               <div className="space-y-6 pt-12 border-t border-slate-200">
                  <h3 className="text-2xl font-black text-royal-black tracking-tight mb-8">Frequent Inquiries</h3>
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="p-6 rounded-3xl bg-white border border-slate-100 hover:border-royal-accent/20 transition-all duration-300 shadow-sm cursor-pointer group">
                       <div className="flex justify-between items-center mb-2">
                          <h5 className="font-bold text-royal-black group-hover:text-royal-accent transition-colors">{faq.q}</h5>
                          <ChevronDown size={16} className="text-slate-400" />
                       </div>
                       <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
               </div>

               {/* Socials */}
               <div className="flex gap-4 pt-8">
                  {[Linkedin, Instagram, Twitter].map((Icon, i) => (
                    <button key={i} className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-royal-black hover:text-white transition-all duration-500">
                       <Icon size={18} />
                    </button>
                  ))}
               </div>
            </div>

            {/* Right Column: Premium Form */}
            <div className="lg:col-span-7">
               <div className="p-10 md:p-14 bg-royal-black rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-royal-accent/20 blur-[100px] pointer-events-none" />
                  
                  <h3 className="text-3xl font-black mb-10 tracking-tight">Direct Inquiry</h3>
                  <form className="space-y-8" onSubmit={e => e.preventDefault()}>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                           <Input placeholder="Jane Doe" className="h-14 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-royal-accent" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                           <Input placeholder="jane@example.com" className="h-14 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-royal-accent" />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Phone Number</label>
                        <Input placeholder="+91 (000) 000-0000" className="h-14 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-royal-accent" />
                     </div>

                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Service Type</label>
                        <select className="w-full h-14 px-4 rounded-2xl bg-white/5 border border-white/10 text-white appearance-none focus:ring-2 focus:ring-royal-accent outline-none">
                           <option className="bg-royal-black text-white">Residential Acquisition</option>
                           <option className="bg-royal-black text-white">Commercial Strategy</option>
                           <option className="bg-royal-black text-white">Asset Valuation</option>
                        </select>
                     </div>

                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Message</label>
                        <textarea placeholder="Tell us about your property requirements..." className="w-full min-h-[120px] p-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-royal-accent outline-none transition-all resize-none" />
                     </div>

                     <Button className="w-full h-16 rounded-2xl bg-royal-accent hover:bg-royal-accent/90 text-white font-black uppercase tracking-widest shadow-lg shadow-royal-accent/20">
                        Connect with Advisor
                     </Button>
                  </form>
               </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}