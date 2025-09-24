import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { BookOpen, Target, Coffee, ArrowRight } from 'lucide-react';
import { mockSchedule } from '../../data/mockData';

export function DailyRoutine({ onTabChange }) {
  const today = new Date();
  const todayName = format(today, 'EEEE');
  const todaySchedule = mockSchedule.filter(item => item.day === todayName)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  const [currentTimePercentage, setCurrentTimePercentage] = useState(0);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const startOfDay = new Date(now).setHours(8, 0, 0, 0); // 8 AM
      const endOfDay = new Date(now).setHours(18, 0, 0, 0); // 6 PM
      const totalDay = endOfDay - startOfDay;
      const elapsed = now.getTime() - startOfDay;
      const percentage = (elapsed / totalDay) * 100;
      setCurrentTimePercentage(Math.max(0, Math.min(100, percentage)));
    };
    calculateTime();
    const interval = setInterval(calculateTime, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const routineItems = [];
  let lastEndTime = '09:00';

  todaySchedule.forEach(item => {
    if (item.startTime > lastEndTime) routineItems.push({ startTime: lastEndTime, endTime: item.startTime, title: 'Free Slot', type: 'free' });
    routineItems.push(item);
    lastEndTime = item.endTime;
  });

  if (lastEndTime < '17:00') routineItems.push({ startTime: lastEndTime, endTime: '17:00', title: 'Free Slot', type: 'free' });

  const getIcon = (type) => ({
    'class': <BookOpen className="h-5 w-5 text-blue-600" />,
    'free': <Coffee className="h-5 w-5 text-green-600" />,
    'activity': <Target className="h-5 w-5 text-purple-600" />,
  }[type] || null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Daily Routine</h1>
        <p className="text-gray-600">Your personalized plan for {format(today, 'EEEE, MMMM do')}.</p>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 relative">
        {currentTimePercentage > 0 && currentTimePercentage < 100 && (
            <div className="absolute left-0 right-0 h-px bg-red-500 z-10" style={{ top: `${(currentTimePercentage / 100) * (routineItems.length * 5.5)}rem` }}>
                <div className="absolute -left-2 -top-2 w-4 h-4 bg-red-500 rounded-full"></div>
            </div>
        )}
        <div className="flow-root">
          <ul className="-mb-8">
            {routineItems.map((item, index) => (
              <li key={index}>
                <div className="relative pb-8">
                  {index !== routineItems.length - 1 && <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"></span>}
                  <div className="relative flex space-x-3">
                    <div><span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">{getIcon(item.type)}</span></div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-500">{item.startTime} - {item.endTime}</p>
                        <p className="font-medium text-gray-900">{item.title}</p>
                        {item.type === 'class' && <p className="text-sm text-gray-500">{item.location}</p>}
                      </div>
                      {item.type === 'free' && (
                        <button onClick={() => onTabChange('activities')} className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full hover:bg-green-200 flex items-center">
                          Find Activity <ArrowRight className="h-4 w-4 ml-1"/>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
