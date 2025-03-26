
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = '', showText = true }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  
  // Base path will include language prefix if available
  const basePath = currentLang && Object.keys(i18n.options.resources || {}).includes(currentLang) 
    ? `/${currentLang}` 
    : '/';
    
  return (
    <Link to={basePath} className={`flex items-center ${className}`}>
      <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 shadow-md">
        <span className="text-white font-bold text-xl md:text-2xl">R</span>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-brand-200 rounded-full shadow-sm flex items-center justify-center">
          <span className="text-brand-600 text-xs font-bold">+</span>
        </div>
      </div>
      {showText && (
        <span className="ml-2 font-bold text-xl md:text-2xl hidden sm:inline-block bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
          RecodePush
        </span>
      )}
    </Link>
  );
};

export default Logo;
