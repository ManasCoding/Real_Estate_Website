import React from 'react';
import { ForgotPasswordFlow } from '@/components/auth/forgot-password-flow';
import { Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar/Navbar';
import Footer from '@/components/layout/Footer/Footer';

/**
 * Premium Forgot Password Page.
 * Aligns with the Royal Bhubaneswar (PDR) branding and homepage layout.
 * 
 * @component
 */
export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white selection:bg-accent selection:text-white">
      {/* 1. Navigation Layer */}
      <Navbar />

      {/* 2. Main Content Layer */}
      <main className="flex-grow">
        <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden bg-royal-linen">
          {/* Abstract Background pattern (Matching Hero) */}
          <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
            <svg width="100%" height="100%">
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-md mx-auto w-full space-y-2 bg-white p-6 sm:p-10 rounded-3xl shadow-[0_32px_64px_-16px_rgba(15,23,42,0.15)] border border-slate-100">
              {/* Canonical Logo Header */}
              <div className="w-full flex justify-center mb-10">
                <Link to="/" className="group flex items-center gap-3">
                  <div className="bg-primary p-2.5 rounded-xl transition-transform duration-300 group-hover:scale-110 shadow-lg shadow-primary/20">
                    <Building2 className="text-white h-6 w-6" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-2xl font-black tracking-tighter text-primary leading-none">PDR</span>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent leading-none mt-1">Real Estate</span>
                  </div>
                </Link>
              </div>

              <ForgotPasswordFlow />
            </div>
          </div>
        </section>
      </main>

      {/* 3. Footer Layer */}
      <Footer />
    </div>
  );
}
