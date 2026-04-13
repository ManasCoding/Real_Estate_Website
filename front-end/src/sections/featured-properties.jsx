import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Bed, Bath, BuildingIcon, ThumbsUpIcon } from '@/icons/landing-page-icons';
import postsData from '../pages/postsData.json';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const PropertyCard = ({ property }) => {
  const isRent = property.listingType === 'rent';
  const price = property.pricing?.amount || 0;
  
  return (
    <motion.div 
      variants={cardVariants}
      className="bg-white rounded-[2rem] overflow-hidden shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.2)] transition-all duration-500 group"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={property.media?.images?.[0]?.url || 'https://via.placeholder.com/600x450?text=No+Image'} 
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        
        {/* Badge */}
        <div className={`absolute top-6 left-6 px-6 py-2 rounded-lg text-[11px] font-black uppercase tracking-widest text-white shadow-lg ${isRent ? 'bg-orange-500' : 'bg-[#2eb82e]'}`}>
           {isRent ? 'For rent' : 'For sale'}
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <h3 className="text-xl font-bold text-[#1b436e] mb-2 line-clamp-1 group-hover:text-orange-500 transition-colors">
          {property.title}
        </h3>
        <p className="text-gray-400 text-xs font-bold mb-4 line-clamp-1">
          {property.location?.address || property.location?.city}
        </p>
        
        <p className="text-[#1b436e] text-2xl font-black mb-8">
          ₹{price >= 10000000 ? `${(price / 10000000).toFixed(2)} Cr` : price.toLocaleString('en-IN')}
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-2 pt-6 border-t border-gray-50">
          <div className="flex flex-col items-center gap-1.5">
            <div className="text-gray-300 group-hover:text-orange-500 transition-colors">
                <Bed className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black text-[#1b436e]">{property.specifications?.bedrooms || 0}</span>
            <span className="text-[8px] font-bold text-gray-400 uppercase">Bedrooms</span>
          </div>
          
          <div className="flex flex-col items-center gap-1.5">
            <div className="text-gray-300 group-hover:text-orange-500 transition-colors">
                <Bath className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black text-[#1b436e]">{property.specifications?.bathrooms || 0}</span>
            <span className="text-[8px] font-bold text-gray-400 uppercase">Bathrooms</span>
          </div>
          
          <div className="flex flex-col items-center gap-1.5">
            <div className="text-gray-300 group-hover:text-orange-500 transition-colors">
                <BuildingIcon className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black text-[#1b436e]">{property.specifications?.builtUpArea || 0}</span>
            <span className="text-[8px] font-bold text-gray-400 uppercase">Total Area</span>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <div className="text-gray-300 group-hover:text-orange-500 transition-colors">
                <ThumbsUpIcon className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black text-[#1b436e]">{property.specifications?.parking?.covered || 0}</span>
            <span className="text-[8px] font-bold text-gray-400 uppercase">Garages</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function FeaturedProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/properties?featured=true&limit=6');
        if (!response.ok) throw new Error('API failed');
        const result = await response.json();
        
        if (result.data && result.data.length > 0) {
          setProperties(result.data);
        } else {
          // Fallback to static data if API is empty
          const fallback = postsData.filter(p => p.id === 6 || p.title.includes('Sahid Nagar'));
          setProperties(fallback.length > 0 ? fallback : postsData.slice(0, 3));
        }
      } catch (err) {
        console.error('Error fetching featured properties, using fallback:', err);
        const fallback = postsData.filter(p => p.id === 6 || p.title.includes('Sahid Nagar'));
        setProperties(fallback.length > 0 ? fallback : postsData.slice(0, 3));
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <section className="py-24 bg-[#f8fafc]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-[#1b436e] mb-4 tracking-tight">
            Discover your featured property
          </h2>
          <p className="text-gray-400 font-medium text-sm md:text-base max-w-2xl mx-auto">
            Leo morbi faucibus mattis pharetra tellus velit ultricies duis rhoncus
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
             <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {properties.map((prop) => (
               <Link to={`/details/${prop.id || prop._id}`} key={prop._id || prop.id}>
                  <PropertyCard property={prop} />
               </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
