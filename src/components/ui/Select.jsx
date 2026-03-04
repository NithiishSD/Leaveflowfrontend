
import React from 'react';
import { ChevronDownIcon } from 'lucide-react';

export function Select({
  label,
  options,
  value,
  onChange,
  error,
  required,
  disabled,
  placeholder = 'Select an option',
  className = ''
}) {
  const selectId = label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      {label &&
      <label
        htmlFor={selectId}
        className="block text-sm font-medium text-gray-700 mb-1.5">

          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      }
      <div className="relative">
        <select
          id={selectId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`
            w-full px-3.5 py-2.5 rounded-lg border bg-white
            text-gray-900 appearance-none cursor-pointer
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
            ${error ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 hover:border-gray-300'}
            ${!value ? 'text-gray-400' : ''}
            ${className}
          `}>

          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) =>
          <option key={option.value} value={option.value}>
              {option.label}
            </option>
          )}
        </select>
        <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>);

}