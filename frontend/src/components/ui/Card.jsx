import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`
      bg-black/40 
      backdrop-blur-sm 
      border border-gray-800 
      rounded-xl 
      shadow-xl 
      p-6 
      hover:border-rose-500/50 
      transition-colors 
      duration-300
      ${className}
    `}>
      {children}
    </div>
  );
};

export default Card; 