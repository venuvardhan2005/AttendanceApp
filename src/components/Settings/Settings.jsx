import React from 'react';
import { Bell, Palette, Lock } from 'lucide-react';

const ToggleSwitch = ({ label }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm text-gray-600">{label}</span>
    <button className="w-11 h-6 bg-gray-200 rounded-full flex items-center px-1">
      <span className="w-4 h-4 bg-white rounded-full shadow-md transform"></span>
    </button>
  </div>
);

export function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account and application settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <Bell className="h-5 w-5 text-gray-500 mr-3" />
            <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
          </div>
          <div className="space-y-4">
            <ToggleSwitch label="Email Notifications" />
            <ToggleSwitch label="Push Notifications" />
            <ToggleSwitch label="Low Attendance Alerts" />
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <Palette className="h-5 w-5 text-gray-500 mr-3" />
            <h2 className="text-lg font-semibold text-gray-800">Appearance</h2>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">Theme</p>
            <div className="flex space-x-2">
              <button className="border-2 border-blue-500 rounded-md p-2">Light</button>
              <button className="border rounded-md p-2">Dark</button>
            </div>
          </div>
        </div>
        
        {/* Security Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:col-span-2">
          <div className="flex items-center mb-4">
            <Lock className="h-5 w-5 text-gray-500 mr-3" />
            <h2 className="text-lg font-semibold text-gray-800">Security</h2>
          </div>
          <div className="space-y-4">
            <button className="text-blue-600 hover:underline">Change Password</button>
            <button className="text-blue-600 hover:underline">Enable Two-Factor Authentication</button>
          </div>
        </div>
      </div>
    </div>
  );
}
