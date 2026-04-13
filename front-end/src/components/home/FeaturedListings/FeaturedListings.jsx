import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import PropertyCard from '../../shared/PropertyCard/PropertyCard';
import { Button } from '@/components/ui/button';

/**
 * Senior Architect level Featured Listings component.
 * Handles data fetching from backend with sophisticated error states and fallback logic.
 * 
 * @component
 */
const FeaturedListings = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch featured properties from the backend API.
   * Includes error handling and fallback to a "NotFound" state.
   */
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        // Using common local backend pattern
        const response = await fetch('http://localhost:5000/api/properties?featured=true&limit=6');
        
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        
        const result = await response.json();
        
        // Handle result structure (array or paginated object)
        const data = Array.isArray(result) ? result : (result.data || []);
        setProperties(data);
      } catch (err) {
        console.error('[FeaturedListings] Data fetch failed:', err);
        setError('Unable to load featured listings at this moment.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-royal-linen/50 -z-10 skew-x-[-12deg] translate-x-20" />

      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="inline-block px-4 py-1.5 bg-royal-blue/5 rounded-lg mb-4">
              <span className="text-primary text-[10px] font-black uppercase tracking-[0.2em]">Curated Selections</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tighter leading-none mb-6">
              Featured <span className="italic font-serif text-accent">Residences</span>
            </h2>
            <p className="text-muted-foreground font-medium leading-relaxed">
              Hand-picked premium properties across Bhubaneswar's most desirable locations. 
              Each listing is verified for quality and legacy.
            </p>
          </div>
          
          <Button asChild variant="ghost" className="group text-primary font-black uppercase tracking-widest gap-3 hover:bg-transparent hover:text-accent">
            <Link to="/listings">
              View All Properties
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Dynamic Content Rendering */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-accent animate-spin" />
            <span className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">Fetching Excellence...</span>
          </div>
        ) : error || properties.length === 0 ? (
          <div className="text-center py-20 bg-royal-linen rounded-3xl border border-dashed border-slate-200">
            <p className="text-primary font-serif italic text-lg mb-4">
              {error || "Our featured portfolio is currently being updated."}
            </p>
            <Button variant="outline" onClick={() => window.location.reload()}>Retry Connection</Button>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {properties.map((property) => (
              <PropertyCard key={property._id || property.id} property={property} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FeaturedListings;
