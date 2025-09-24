import React from 'react';
import { X, Clock, MapPin, Info } from 'lucide-react';

export function ScheduleEventModal({ event, onClose }) {
  if (!event) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">{event.title}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center text-gray-700">
            <Clock className="h-5 w-5 mr-3 text-blue-500" />
            <span>{event.startTime} - {event.endTime}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <MapPin className="h-5 w-5 mr-3 text-green-500" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-start text-gray-700">
            <Info className="h-5 w-5 mr-3 text-purple-500 flex-shrink-0 mt-1" />
            <span>{event.description}</span>
          </div>
        </div>
        <div className="p-4 bg-gray-50 border-t text-right">
            <button onClick={onClose} className="bg-blue-600 text-white py-2 px-4 rounded-md">Close</button>
        </div>
      </div>
    </div>
  );
}
