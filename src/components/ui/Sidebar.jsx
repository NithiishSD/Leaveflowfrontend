
import React from 'react';
import { LogOutIcon, XIcon } from 'lucide-react';

const roleLabels = {
  employee: 'Employee',
  manager: 'Manager',
  hr: 'HR Admin'
};

export function Sidebar({
  items,
  activeItem,
  onItemClick,
  userName,
  userRole,
  onLogout,
  isOpen,
  onClose
}) {
  return (
    <>
      {isOpen &&
      <div
        className="sticky top-0 inset-0 h-screen bg-black/50 z-40 lg:hidden"
        onClick={onClose} />

      }

      <aside
        className={`
          sticky top-0 left-0 h-screen w-64 bg-slate-900 z-70
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>

        <div className=" flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-white font-semibold text-lg">
                LeaveFlow
              </span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Close sidebar">

              <XIcon className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1">
            {items.map((item) =>
            <button
              key={item.key}
              onClick={() => {
                onItemClick(item.key);
                onClose();
              }}
              className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg
                  text-left transition-colors duration-200
                  ${activeItem === item.key ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}
                `}>

                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            )}
          </nav>

          <div className="px-3 py-4 border-t border-slate-800">
            <div className="px-4 py-3 mb-2">
              <p className="text-white font-medium truncate">{userName}</p>
              <p className="text-slate-400 text-sm">{roleLabels[userRole]}</p>
            </div>
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">

              <LogOutIcon className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>);

}
