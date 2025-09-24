import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getSubjects, addSubject } from '../../data/mockData';
import { PlusCircle } from 'lucide-react';

const schema = yup.object().shape({
  name: yup.string().required('Subject name is required'),
  code: yup.string().required('Subject code is required'),
});

export function SubjectManagement() {
  const [subjects, setSubjects] = useState(getSubjects());
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    addSubject(data);
    setSubjects([...getSubjects()]);
    reset();
    alert('Subject added! The schedule now includes this subject dynamically.');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Subject Management</h1>
        <p className="text-gray-600">View and add course subjects.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b"><h2 className="text-lg font-semibold text-gray-800">Existing Subjects</h2></div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subjects.map(subject => (
                  <tr key={subject.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{subject.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subject.code}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Subject</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Subject Name</label>
              <input {...register('name')} className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" />
              <p className="text-red-500 text-xs mt-1">{errors.name?.message}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subject Code</label>
              <input {...register('code')} className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" />
              <p className="text-red-500 text-xs mt-1">{errors.code?.message}</p>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md flex items-center justify-center hover:bg-blue-700">
              <PlusCircle className="h-4 w-4 mr-2" />Add Subject
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
