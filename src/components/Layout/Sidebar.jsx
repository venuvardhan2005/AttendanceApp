import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Home, 
  Calendar, 
  QrCode, 
  BarChart3, 
  Users, 
  BookOpen,
  Target,
  Settings,
  Book,
} from 'lucide-react';

export function Sidebar({ activeTab, onTabChange, isOpen, onClose }) {
  const { user } = useAuth();

  const getMenuItems = () => {
    const commonItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'schedule', label: 'Schedule', icon: Calendar },
    ];

    if (user?.role === 'student') {
      return [
        ...commonItems,
        { id: 'attendance', label: 'My Attendance', icon: QrCode },
        { id: 'activities', label: 'Activities', icon: Target },
        { id: 'routine', label: 'Daily Routine', icon: BookOpen },
      ];
    }

    if (user?.role === 'teacher') {
      return [
        ...commonItems,
        { id: 'qr-generator', label: 'Generate QR', icon: QrCode },
        { id: 'attendance-management', label: 'Manage Attendance', icon: BarChart3 },
        { id: 'students', label: 'Students', icon: Users },
      ];
    }

    if (user?.role === 'admin') {
      return [
        ...commonItems,
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'users', label: 'User Management', icon: Users },
        { id: 'subjects', label: 'Subjects', icon: Book },
        { id: 'settings', label: 'Settings', icon: Settings },
      ];
    }

    return commonItems;
  };

  const menuItems = getMenuItems();

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`
        fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
        lg:relative lg:translate-x-0 lg:flex-shrink-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
        </div>
        
        <nav className="mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  onClose();
                }}
                className={`
                  w-full flex items-center px-6 py-3 text-left transition-colors duration-200
                  ${activeTab === item.id 
                    ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                  }
                `}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
