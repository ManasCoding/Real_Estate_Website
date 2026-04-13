import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Bed, Bath, Maximize2, MapPin } from 'lucide-react';
import Badge from '../Badge/Badge';

/**
 * A sophisticated Property Card component for high-end real estate listings.
 * Designed with the "Royal Bhubaneswar" aesthetic.
 * 
 * @component
 * @param {Object} props
 * @param {Object} props.property - Property data object from backend
 */
const PropertyCard = ({ property }) => {
  if (!property) return null;

  const {
    id,
    _id,
    title,
    location,
    pricing,
    specifications,
    media,
    listingType
  } = property;

  const displayId = id || _id;
  const isRent = listingType === 'rent' || property.type === 'rent';
  const price = pricing?.amount || property.price || 0;
  const mainImage = media?.images?.[0]?.url || property.images?.[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800';

  /**
   * Formats price into Indian numbering system (Lakhs/Crores)
   * @param {number} val 
   */
  const formatPrice = (val) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
    return `₹${val.toLocaleString('en-IN')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100"
    >
      <Link to={`/details/${displayId}`}>
        {/* Media Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={mainImage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Badge Overlay */}
          <div className="absolute top-4 left-4 z-10">
            <Badge variant={isRent ? 'accent' : 'primary'}>
              {isRent ? 'For Rent' : 'For Sale'}
            </Badge>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <div className="flex items-center gap-1 text-muted-foreground text-[10px] font-bold uppercase tracking-widest mb-2">
            <MapPin size={12} className="text-secondary" />
            <span className="line-clamp-1">{location?.address || property.address || 'Bhubaneswar, Odisha'}</span>
          </div>

          <h3 className="text-xl font-bold text-primary mb-1 line-clamp-1 group-hover:text-accent transition-colors">
            {title}
          </h3>

          <div className="text-2xl font-black text-primary mb-6">
            {formatPrice(price)}
            {isRent && <span className="text-xs font-normal text-muted-foreground ml-1">/ Month</span>}
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-50">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Bed size={16} className="text-accent" />
                <span className="text-sm font-black text-primary">{specifications?.bedrooms || property.bedroom || 0}</span>
              </div>
              <span className="text-[11px] uppercase font-bold tracking-widest text-muted-foreground/60">Beds</span>
            </div>

            <div className="flex flex-col gap-1 border-x border-slate-50 px-4">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Bath size={16} className="text-accent" />
                <span className="text-sm font-black text-primary">{specifications?.bathrooms || property.bathroom || 0}</span>
              </div>
              <span className="text-[11px] uppercase font-bold tracking-widest text-muted-foreground/60">Baths</span>
            </div>

            <div className="flex flex-col gap-1 items-end">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Maximize2 size={16} className="text-accent" />
                <span className="text-sm font-black text-primary">{specifications?.builtUpArea || property.postDetail?.size || 0}</span>
              </div>
              <span className="text-[11px] uppercase font-bold tracking-widest text-muted-foreground/60">Sq. Ft</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

PropertyCard.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    _id: PropTypes.string,
    title: PropTypes.string.isRequired,
    location: PropTypes.object,
    address: PropTypes.string,
    pricing: PropTypes.object,
    price: PropTypes.number,
    specifications: PropTypes.object,
    bedroom: PropTypes.number,
    bathroom: PropTypes.number,
    media: PropTypes.object,
    images: PropTypes.array,
    listingType: PropTypes.string,
    type: PropTypes.string,
    postDetail: PropTypes.object,
  }).isRequired,
};

export default PropertyCard;
