import React from 'react';
import { Link } from 'react-router-dom';
import nithiLogoImg from '../assets/images/nithi visual logo.jpeg';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showBadge?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'sm' }) => {
  const heightClasses = {
    sm: 'h-6 sm:h-7',
    md: 'h-7 sm:h-8',
    lg: 'h-8 sm:h-9'
  };

  const textClasses = {
    sm: 'text-xs sm:text-sm',
    md: 'text-sm sm:text-base',
    lg: 'text-base sm:text-lg'
  };

  return (
    <Link 
      to="/" 
      id="brand-logo-link"
      className={`group inline-flex items-center gap-2.5 transition-transform duration-200 active:scale-98 ${className}`}
    >
      <img
        src={nithiLogoImg}
        alt="NITHI VISUAL"
        className={`${heightClasses[size]} w-auto object-contain block rounded-xs border border-[#353535]/10 shadow-2xs`}
        loading="eager"
      />
      <span className={`font-serif font-bold tracking-wider text-[#353535] uppercase ${textClasses[size]}`}>
        NITHI VISUAL
      </span>
    </Link>
  );
};
