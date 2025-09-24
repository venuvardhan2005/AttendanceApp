import React, { useState } from 'react';
import { Target, Clock, Star, Play, BookOpen, Briefcase, Code } from 'lucide-react';
import { mockActivities } from '../../data/mockData';

export function ActivitySuggestions({ onStartActivity }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'quiz', label: 'Quizzes' },
    { id: 'video', label: 'Videos' },
  ];

  const filteredActivities = mockActivities.filter(activity => {
    const categoryMatch = selectedCategory === 'all' || activity.contentType === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'all' || activity.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const getDifficultyColor = (difficulty) => ({
    'beginner': 'bg-green-100 text-green-800',
    'intermediate': 'bg-yellow-100 text-yellow-800',
    'advanced': 'bg-red-100 text-red-800',
  }[difficulty] || 'bg-gray-100 text-gray-800');

  const getTypeIcon = (type) => ({
    'quiz': BookOpen,
    'video': Briefcase,
  }[type] || Target);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Activity Suggestions</h1>
        <p className="text-gray-600">Personalised activities based on your interests and career goals.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button key={category.id} onClick={() => setSelectedCategory(category.id)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActivities.map((activity) => {
          const TypeIcon = getTypeIcon(activity.contentType);
          return (
            <div key={activity.id} className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
              <div className="p-6 flex-grow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <TypeIcon className="h-5 w-5 text-blue-600" />
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getDifficultyColor(activity.difficulty)}`}>{activity.difficulty}</span>
                  </div>
                  <div className="flex items-center"><Star className="h-4 w-4 text-yellow-400 mr-1" />{activity.rating}</div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{activity.title}</h3>
                <div className="flex items-center text-sm text-gray-500 mb-4"><Clock className="h-4 w-4 mr-1" />{activity.estimatedTime} min</div>
              </div>
              <div className="p-6 pt-0">
                <button onClick={() => onStartActivity(activity)} className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center"><Play className="h-4 w-4 mr-2" />
                  Start
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
