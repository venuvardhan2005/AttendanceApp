import React from 'react';
import { format } from 'date-fns';
import { BookOpen, Target, Calendar, TrendingUp, Sun, Moon } from 'lucide-react';
import { mockSchedule, mockActivities } from '../../data/mockData';

export function StudentDashboard({ user, onStartActivity }) {
  const attendancePercentage = 87;
  const today = new Date();
  const todayName = format(today, 'EEEE');
  const isWeekend = today.getDay() === 0 || today.getDay() === 6;

  const upcomingClasses = isWeekend ? [] : mockSchedule
    .filter(c => c.day === todayName)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));
  
  const suggestedActivities = mockActivities.slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
        <div className="text-right">
          <p className="text-sm text-gray-600">Student ID: {user.studentId}</p>
          <p className="text-sm text-gray-600">{user.department} - Year {user.year}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stats Cards */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg"><TrendingUp className="h-6 w-6 text-blue-600" /></div>
            <div className="ml-4"><p className="text-sm font-medium text-gray-600">Attendance</p><p className="text-2xl font-bold text-gray-900">{attendancePercentage}%</p></div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 flex items-center">
            <div className="p-3 bg-green-100 rounded-lg"><BookOpen className="h-6 w-6 text-green-600" /></div>
            <div className="ml-4"><p className="text-sm font-medium text-gray-600">Classes Today</p><p className="text-2xl font-bold text-gray-900">{upcomingClasses.length}</p></div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg"><Target className="h-6 w-6 text-purple-600" /></div>
            <div className="ml-4"><p className="text-sm font-medium text-gray-600">Activities</p><p className="text-2xl font-bold text-gray-900">{suggestedActivities.length}</p></div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg"><Calendar className="h-6 w-6 text-orange-600" /></div>
            <div className="ml-4"><p className="text-sm font-medium text-gray-600">Free Slots</p><p className="text-2xl font-bold text-gray-900">3</p></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Today's Classes ({todayName})</h2>
          </div>
          <div className="p-6">
            {isWeekend ? (
              <div className="text-center py-10">
                <Sun className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="font-medium text-gray-800">It's the weekend!</h3>
                <p className="text-sm text-gray-500">No classes scheduled today. Enjoy your break!</p>
              </div>
            ) : upcomingClasses.length > 0 ? (
              <div className="space-y-4">
                {upcomingClasses.map((class_, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{class_.title}</h3>
                      <p className="text-sm text-gray-600">{class_.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{class_.startTime} - {class_.endTime}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
                 <div className="text-center py-10">
                    <Moon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-medium text-gray-800">No More Classes Today</h3>
                    <p className="text-sm text-gray-500">Your scheduled classes for today are over.</p>
                </div>
            )}
          </div>
        </div>

        {/* Suggested Activities */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Suggested Activities</h2>
          </div>
          <div className="p-6 space-y-4">
            {suggestedActivities.map((activity) => (
              <div key={activity.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                <h3 className="font-medium text-gray-900 mb-2">{activity.title}</h3>
                <button onClick={() => onStartActivity(activity)} className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200">
                  Start Activity
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
