import React from 'react';
import { LoginForm } from '@/components/auth/login-form';
import { Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Senior Architect level Login Page.
 * Implements the Royal Branding (PDR logo) and monochromatic aesthetic.
 */
export default function LoginPage() {
  return (
    <div className="min-h-screen flex w-full bg-white font-sans selection:bg-royal-accent selection:text-white">
      {/* Left Content Area: Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-royal-linen/50 relative z-10">
        <div className="mx-auto w-full max-w-sm lg:w-96 flex flex-col items-center">
          {/* Canonical Logo Header */}
          <div className="w-full flex justify-start mb-12">
            <Link to="/" className="group flex items-center gap-3">
              <div className="bg-primary p-2.5 rounded-xl transition-transform duration-300 group-hover:scale-110 shadow-lg shadow-primary/20">
                <Building2 className="text-white h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter text-primary leading-none">PDR</span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent leading-none mt-1">Real Estate</span>
              </div>
            </Link>
          </div>

          {/* Form Content */}
          <div className="w-full">
            <LoginForm />
          </div>
        </div>
      </div>

      {/* Right Image Area - Premium Branding */}
      <div className="hidden lg:block relative w-full flex-1 overflow-hidden bg-royal-black">
        <div className="absolute inset-0 bg-gradient-to-br from-royal-black/80 via-royal-black/40 to-royal-accent/10 z-10" />
        <img
          className="absolute inset-0 h-full w-full object-cover grayscale opacity-60 hover:scale-105 transition-transform duration-[2000ms] ease-out"
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1920"
          alt="Luxury Architecture" />
        
        {/* Editorial Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-24 text-center">
          <div className="max-w-xl">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight font-serif italic">
               Modern sanctuaries <span className="text-royal-accent">defined.</span>
            </h2>
            <div className="w-12 h-1 bg-royal-accent mx-auto mb-8 rounded-full" />
            <p className="text-xl text-slate-300 font-serif italic leading-relaxed">
              "Experience the standard of Royal Bhubaneswar, where every transaction is handled 
              with the transparency and discretion your legacy deserves."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}