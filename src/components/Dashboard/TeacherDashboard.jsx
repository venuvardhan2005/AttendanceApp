import React from 'react';
import { format } from 'date-fns';
import { Users, QrCode, BarChart3, Clock, Sun, Moon } from 'lucide-react';
import { mockSchedule } from '../../data/mockData';

export function TeacherDashboard({ user }) {
  const today = new Date();
  const todayName = format(today, 'EEEE');
  const isWeekend = today.getDay() === 0 || today.getDay() === 6;

  const todayClasses = isWeekend ? [] : mockSchedule
    .filter(c => c.day === todayName && user.subjects.includes(c.title))
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  const attendanceStats = {
    totalStudents: 120,
    presentToday: 102,
    averageAttendance: 85,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.name}</h1>
        <div className="text-right">
          <p className="text-sm text-gray-600">Employee ID: {user.employeeId}</p>
          <p className="text-sm text-gray-600">{user.department}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stats Cards */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg"><Users className="h-6 w-6 text-blue-600" /></div>
            <div className="ml-4"><p className="text-sm font-medium text-gray-600">Total Students</p><p className="text-2xl font-bold text-gray-900">{attendanceStats.totalStudents}</p></div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 flex items-center">
            <div className="p-3 bg-green-100 rounded-lg"><BarChart3 className="h-6 w-6 text-green-600" /></div>
            <div className="ml-4"><p className="text-sm font-medium text-gray-600">Present Today</p><p className="text-2xl font-bold text-gray-900">{attendanceStats.presentToday}</p></div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg"><QrCode className="h-6 w-6 text-purple-600" /></div>
            <div className="ml-4"><p className="text-sm font-medium text-gray-600">Avg Attendance</p><p className="text-2xl font-bold text-gray-900">{attendanceStats.averageAttendance}%</p></div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg"><Clock className="h-6 w-6 text-orange-600" /></div>
            <div className="ml-4"><p className="text-sm font-medium text-gray-600">Classes Today</p><p className="text-2xl font-bold text-gray-900">{todayClasses.length}</p></div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Today's Classes ({todayName})</h2>
        </div>
        <div className="p-6">
          {isWeekend ? (
              <div className="text-center py-10">
                <Sun className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="font-medium text-gray-800">It's the weekend!</h3>
                <p className="text-sm text-gray-500">No classes scheduled today.</p>
              </div>
          ) : todayClasses.length > 0 ? (
            <div className="space-y-4">
              {todayClasses.map((class_, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{class_.title}</h3>
                    <p className="text-sm text-gray-600">{class_.location}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-900">{class_.startTime}</span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Generate QR</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
                <Moon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-medium text-gray-800">No Classes Scheduled For You Today</h3>
                <p className="text-sm text-gray-500">You have no classes to teach today.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
