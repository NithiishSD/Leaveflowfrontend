
import React from 'react';
import { MenuIcon } from 'lucide-react';

const roleLabels = {
  employee: 'Employee',
  manager: 'Manager',
  hr: 'HR Admin'
};

const roleBadgeColors = {
  employee: 'bg-blue-100 text-blue-700',
  manager: 'bg-purple-100 text-purple-700',
  hr: 'bg-green-100 text-green-700'
};

export function TopBar({ userName, userRole, onMenuToggle }) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Open menu">

          <MenuIcon className="w-6 h-6" />
        </button>

        <div className="hidden lg:block">
          <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{userName}</p>
            <span
              className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${roleBadgeColors[userRole]}`}>

              {roleLabels[userRole]}
            </span>
          </div>
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-600 font-medium">
              {userName.
              split(' ').
              map((n) => n[0]).
              join('')}
            </span>
          </div>
        </div>
      </div>
    </header>);

}