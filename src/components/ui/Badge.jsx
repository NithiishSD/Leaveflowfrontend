
import React from 'react';

const statusConfig = {
  'pending-manager': {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    label: 'Pending Manager'
  },
  'pending-hr': {
    bg: 'bg-purple-100',
    text: 'text-purple-700',
    label: 'Pending HR'
  },
  approved: {
    bg: 'bg-green-100',
    text: 'text-green-700',
    label: 'Approved'
  },
  rejected: {
    bg: 'bg-red-100',
    text: 'text-red-700',
    label: 'Rejected'
  },
  returned: {
    bg: 'bg-orange-100',
    text: 'text-orange-700',
    label: 'Returned'
  }
};

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm'
};

export function Badge({ status, size = 'md' }) {
  const config = statusConfig[status];
  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full
        ${config.bg} ${config.text} ${sizeStyles[size]}
      `}>

      {config.label}
    </span>);

}