
import React from 'react';

export function Textarea({
  label,
  error,
  onChange,
  required,
  rows = 4,
  className = '',
  id,
  ...props
}) {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      {label &&
      <label
        htmlFor={textareaId}
        className="block text-sm font-medium text-gray-700 mb-1.5">

          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      }
      <textarea
        id={textareaId}
        rows={rows}
        onChange={(e) => onChange?.(e.target.value)}
        className={`
          w-full px-3.5 py-2.5 rounded-lg border bg-white
          text-gray-900 placeholder-gray-400 resize-none
          transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
          ${error ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 hover:border-gray-300'}
          ${className}
        `}
        {...props} />

      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>);

}