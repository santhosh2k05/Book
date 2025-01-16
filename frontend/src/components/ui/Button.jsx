import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ 
  children, 
  to, 
  onClick, 
  variant = 'primary',
  className = '',
  ...props 
}) => {
  const baseStyles = "px-6 py-3 rounded-lg font-semibold transition duration-200";
  
  const variants = {
    primary: "border border-rose-500 hover:bg-rose-500/10",
    secondary: "border border-purple-500 hover:bg-purple-500/10",
    gradient: "bg-gradient-to-r from-rose-500 to-purple-500 hover:opacity-90"
  };

  const buttonStyles = `${baseStyles} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={buttonStyles} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={buttonStyles} {...props}>
      {children}
    </button>
  );
};

export default Button; 