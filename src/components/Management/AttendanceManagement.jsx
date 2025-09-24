import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import { Download, Filter } from 'lucide-react';
import { mockAttendance, mockSubjects } from '../../data/mockData';

export function AttendanceManagement() {
  const [filterSubject, setFilterSubject] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const filteredData = mockAttendance.filter(record => {
    const subjectMatch = filterSubject ? record.subject === filterSubject : true;
    const dateMatch = filterDate ? record.date === filterDate : true;
    return subjectMatch && dateMatch;
  });

  const headers = [
    { label: "Student Name", key: "studentName" },
    { label: "Student ID", key: "studentId" },
    { label: "Subject", key: "subject" },
    { label: "Date", key: "date" },
    { label: "Status", key: "status" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance Management</h1>
          <p className="text-gray-600">View, filter, and export attendance records.</p>
        </div>
        <CSVLink 
          data={filteredData} 
          headers={headers}
          filename={"attendance_report.csv"}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
        >
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </CSVLink>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          <Filter className="h-5 w-5 text-gray-500" />
          <select 
            value={filterSubject}
            onChange={e => setFilterSubject(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
          >
            <option value="">All Subjects</option>
            {mockSubjects.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
          </select>
          <input 
            type="date"
            value={filterDate}
            onChange={e => setFilterDate(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map(record => (
                <tr key={record.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{record.studentName}</div>
                    <div className="text-sm text-gray-500">{record.studentId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      record.status === 'present' ? 'bg-green-100 text-green-800' :
                      record.status === 'absent' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
