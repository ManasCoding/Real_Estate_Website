import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

/**
 * Social proof section featuring client testimonials.
 * 
 * @component
 */
const Testimonials = () => {
  const reviews = [
    {
      name: 'Ashok Mohanty',
      role: 'Business Owner',
      text: 'PDR Real Estate helped me find the perfect penthouse in Patia. Their professionalism and knowledge of the Bhubaneswar market is unmatched.',
      image: 'https://i.pravatar.cc/150?u=ashok'
    },
    {
      name: 'Priyanka Dash',
      role: 'IT Professional',
      text: 'The best real estate experience in Odisha. They handled everything from legal paperwork to bank loans. Highly recommended!',
      image: 'https://i.pravatar.cc/150?u=priyanka'
    },
    {
      name: 'Rajesh Mishra',
      role: 'NRI Investor',
      text: 'As an NRI, I needed someone I could trust. PDR provided transparent dealings and found me a great investment property near Infocity.',
      image: 'https://i.pravatar.cc/150?u=rajesh'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-4 tracking-tighter">
            Voices of <span className="italic font-serif text-accent">Satisfaction</span>
          </h2>
          <p className="text-muted-foreground font-medium max-w-xl mx-auto">
            Join hundreds of happy families who have found their dream homes with our expert guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {reviews.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-10 rounded-[2.5rem] bg-royal-linen border border-slate-50 relative group hover:bg-white hover:shadow-2xl transition-all duration-500"
            >
              <div className="absolute top-8 right-8 text-accent/20 group-hover:text-accent/40 transition-colors">
                <Quote size={40} />
              </div>
              
              <p className="text-primary font-medium leading-relaxed mb-10 italic font-serif">
                "{item.text}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-black text-primary text-sm">{item.name}</h4>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
