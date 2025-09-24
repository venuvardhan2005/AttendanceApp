import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { mockSchedule } from '../../data/mockData';

export function Schedule({ onEventClick }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const getEventsForDay = (day) => {
    const dayName = format(day, 'EEEE');
    return mockSchedule.filter(event => event.day === dayName);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Class Schedule</h1>
        <p className="text-gray-600">View your weekly and monthly class schedule.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="p-2 rounded-md hover:bg-gray-100"><ChevronLeft className="h-5 w-5 text-gray-600" /></button>
          <h2 className="text-lg font-semibold text-gray-800">{format(currentMonth, 'MMMM yyyy')}</h2>
          <button onClick={nextMonth} className="p-2 rounded-md hover:bg-gray-100"><ChevronRight className="h-5 w-5 text-gray-600" /></button>
        </div>

        <div className="grid grid-cols-7 gap-px bg-gray-200 border-t border-l border-gray-200">
          {weekDays.map(day => (
            <div key={day} className="text-center py-2 bg-gray-50 text-sm font-medium text-gray-600 border-r border-b border-gray-200">{day}</div>
          ))}
          
          {days.map(day => {
            const dayEvents = getEventsForDay(day);
            return (
              <div key={day.toString()} className={`p-2 h-36 overflow-y-auto bg-white border-r border-b border-gray-200 ${!isSameMonth(day, currentMonth) ? 'bg-gray-50' : ''}`}>
                <div className={`flex items-center justify-center h-6 w-6 rounded-full text-sm ${isToday(day) ? 'bg-blue-600 text-white' : ''}`}>{format(day, 'd')}</div>
                <div className="mt-1 space-y-1">
                  {dayEvents.map(event => (
                    <button key={event.id} onClick={() => onEventClick(event)} className="w-full text-left p-1 rounded bg-blue-100 text-blue-800 text-xs truncate hover:bg-blue-200">
                      {event.title}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
