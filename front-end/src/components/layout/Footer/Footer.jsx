import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Mail, Phone, MapPin, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';

/**
 * Senior Architect level Footer component.
 * Includes localized Bhubaneswar office information and a clean, structured layout.
 * 
 * @component
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Navigation',
      links: [
        { name: 'Featured Listings', path: '/listings' },
        { name: 'Register Property', path: '/sell-list' },
        { name: 'Expert Agents', path: '/contact' },
        { name: 'About PDR', path: '/contact' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Privacy Policy', path: '/' },
        { name: 'Terms of Service', path: '/' },
        { name: 'RERA Compliance', path: '/' },
        { name: 'Market Reports', path: '/' }
      ]
    }
  ];

  return (
    <footer className="bg-primary pt-24 pb-12 text-white overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent opacity-5 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Brand and About */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-8">
              <div className="bg-white p-2 rounded-xl">
                <Building2 className="text-primary h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter text-white leading-none">PDR</span>
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-accent leading-none mt-1 text-accent">Real Estate</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              The premier real estate authority in Bhubaneswar. Curating excellence and building 
              legacies for three generations of Odisha residents.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-white transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-white transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-white transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-white transition-all">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Localized Contact Information */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-black mb-8 uppercase tracking-widest text-accent">Headquarters</h4>
            <div className="flex flex-col gap-6">
              <div className="flex gap-4">
                <MapPin className="text-accent shrink-0" size={20} />
                <div className="text-sm text-slate-400 leading-relaxed">
                  PDR Tower, DLF Cyber City,<br/> 
                  Patia, Bhubaneswar,<br/> 
                  Odisha 751024
                </div>
              </div>
              <div className="flex gap-4 items-center font-bold text-sm">
                <Phone className="text-accent shrink-0" size={20} />
                <a href="tel:+912573886895" className="hover:text-accent transition-colors">+91 (257) 388-6895</a>
              </div>
              <div className="flex gap-4 items-center font-bold text-sm">
                <Mail className="text-accent shrink-0" size={20} />
                <a href="mailto:concierge@pdrealestate.in" className="hover:text-accent transition-colors">concierge@pdrealestate.in</a>
              </div>
            </div>
          </div>

          {/* Links sections */}
          {footerLinks.map((section, idx) => (
            <div key={idx} className="lg:col-span-1">
              <h4 className="text-lg font-black mb-8 uppercase tracking-widest text-white">{section.title}</h4>
              <ul className="flex flex-col gap-4">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link to={link.path} className="text-sm text-slate-400 hover:text-accent transition-colors flex items-center gap-2 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
            © {currentYear} PDR Real Estate Group. All rights reserved. 
            <span className="ml-4">Designed for Bhubaneswar with Excellence.</span>
          </div>
          <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
             <span>RERA REG: OR-BBSR-2024-0012</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
