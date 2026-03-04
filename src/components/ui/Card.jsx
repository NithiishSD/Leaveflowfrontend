
import React from 'react';

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8'
};

export function Card({ children, className = '', padding = 'md' }) {
  return (
    <div
      className={`
        bg-white rounded-xl shadow-sm border border-gray-100
        ${paddingStyles[padding]}
        ${className}
      `}>

      {children}
    </div>);

}