import React from 'react';
import PropTypes from 'prop-types';

/**
 * A premium, highly stylized badge component for categorical information.
 * Uses Royal Bhubaneswar design tokens for consistent branding.
 * 
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Inner content of the badge
 * @param {('primary'|'accent'|'gold'|'outline')} [props.variant='primary'] - Visual style variant
 * @param {string} [props.className=''] - Additional CSS classes
 */
const Badge = ({ children, variant = 'primary', className = '' }) => {
  const variants = {
    primary: 'bg-primary text-white',
    accent: 'bg-accent text-white',
    gold: 'bg-[#D4AF37] text-white', // Use direct hex for precision if needed, or theme var
    outline: 'border border-primary text-primary bg-transparent'
  };

  return (
    <span className={`
      inline-flex items-center px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm 
      ${variants[variant] || variants.primary} 
      ${className}
    `}>
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'accent', 'gold', 'outline']),
  className: PropTypes.string,
};

export default Badge;
