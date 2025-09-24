import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getStudents, getTeachers } from '../../data/mockData';
import { UserPlus, X } from 'lucide-react';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  role: yup.string().oneOf(['student', 'teacher']).required('Role is required'),
});

export function UserManagement() {
  const [activeTab, setActiveTab] = useState('students');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const students = getStudents();
  const teachers = getTeachers();

  const onSubmit = (data) => {
    console.log('New user data:', data);
    setIsModalOpen(false);
    alert('New user created successfully (check console)!');
  };

  const renderTable = (users) => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map(user => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage student and teacher accounts.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Create User
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('students')}
              className={`${activeTab === 'students' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Students
            </button>
            <button
              onClick={() => setActiveTab('teachers')}
              className={`${activeTab === 'teachers' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Teachers
            </button>
          </nav>
        </div>
        {activeTab === 'students' ? renderTable(students) : renderTable(teachers)}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Create New User</h2>
              <button onClick={() => setIsModalOpen(false)}><X className="h-6 w-6 text-gray-500" /></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input {...register('name')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
                <p className="text-red-500 text-xs mt-1">{errors.name?.message}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" {...register('email')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
                <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select {...register('role')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3">
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
                <p className="text-red-500 text-xs mt-1">{errors.role?.message}</p>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">Create User</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
