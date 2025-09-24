import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, Menu, Bell, User } from 'lucide-react';

export function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="ml-2 text-xl font-semibold text-gray-800">
            Smart Curriculum
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100">
            <Bell className="h-5 w-5" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              
              <button
                onClick={logout}
                className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
