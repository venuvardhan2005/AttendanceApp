import React, { useState, useEffect } from 'react';
import { QrCode, Clock, Users } from 'lucide-react';
import { mockSubjects } from '../../data/mockData';

export function QRGenerator() {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  useEffect(() => {
    let interval;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const generateQR = () => {
    if (!selectedSubject) return;
    
    const sessionId = Math.random().toString(36).substring(7);
    setQrCode(`ATTENDANCE_${selectedSubject}_${sessionId}`);
    setIsActive(true);
    setTimeLeft(300);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">QR Code Generator</h1>
        <p className="text-gray-600">Generate QR codes for attendance tracking</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Choose a subject...</option>
                {mockSubjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name} ({subject.code})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={generateQR}
              disabled={!selectedSubject || isActive}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isActive ? 'QR Code Active' : 'Generate QR Code'}
            </button>
          </div>
        </div>
      </div>

      {qrCode && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="text-center">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">QR Code Active</h3>
                <p className="text-sm text-gray-600">
                  Students can scan this code to mark attendance
                </p>
              </div>

              <div className="inline-block p-8 bg-gray-100 rounded-lg mb-4">
                <div className="w-48 h-48 bg-black flex items-center justify-center rounded-lg">
                  <QrCode className="h-32 w-32 text-white" />
                </div>
              </div>

              <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Time left: {formatTime(timeLeft)}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Students scanned: 0
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-md">
                <p className="text-xs text-blue-700">
                  QR Code: {qrCode}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
