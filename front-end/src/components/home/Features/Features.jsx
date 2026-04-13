import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Star, Clock, HeartHandshake } from 'lucide-react';

/**
 * Value proposition section highlighting the platform's strengths.
 * Follows a clean, editorial layout.
 * 
 * @component
 */
const Features = () => {
  const valueProps = [
    {
      title: 'Heritage & Trust',
      desc: 'Over two decades of excellence in the Bhubaneswar real estate market.',
      icon: <ShieldCheck size={28} className="text-accent" />,
      color: 'bg-accent/5'
    },
    {
      title: 'Premium Selection',
      desc: 'Exclusive access to high-end villas and penthouses in prime locations.',
      icon: <Star size={28} className="text-royal-gold" />,
      color: 'bg-royal-gold/5'
    },
    {
      title: 'Expert Consultation',
      desc: 'Dedicated relationship managers for seamless property acquisition.',
      icon: <HeartHandshake size={28} className="text-primary" />,
      color: 'bg-primary/5'
    },
    {
      title: 'Fast Process',
      desc: 'Expedited documentation and legal assistance for a hassle-free experience.',
      icon: <Clock size={28} className="text-primary" />,
      color: 'bg-primary/5'
    }
  ];

  return (
    <section className="py-24 bg-royal-linen">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div>
            <div className="inline-block px-4 py-1.5 bg-primary/5 rounded-lg mb-4">
              <span className="text-primary text-[10px] font-black uppercase tracking-[0.2em]">Why Choose PDR</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tighter leading-none mb-8">
              Elevating the standard of <br/>
              <span className="italic font-serif text-accent text-6xl">Living.</span>
            </h2>
            <p className="text-muted-foreground font-medium leading-relaxed mb-12 max-w-lg">
              We don't just sell property; we curate lifestyles. Our commitment to transparency 
              and excellence has made us the #1 choice for premium buyers in Odisha.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {valueProps.map((prop, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col gap-4"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${prop.color}`}>
                    {prop.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-primary mb-1">{prop.title}</h3>
                    <p className="text-sm text-muted-foreground leading-snug">{prop.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl skew-y-2 lg:skew-y-0 lg:rotate-2">
              <img 
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800" 
                alt="Architecture Excellence" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-royal-gold rounded-full -z-10 blur-3xl opacity-20" />
            <div className="absolute -top-10 -right-10 w-60 h-60 bg-accent rounded-full -z-10 blur-3xl opacity-10" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;
