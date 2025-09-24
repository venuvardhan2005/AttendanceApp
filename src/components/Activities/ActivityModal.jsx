import React from 'react';
import { X } from 'lucide-react';
import { QuizView } from './QuizView';
import { VideoView } from './VideoView';

export function ActivityModal({ activity, onClose }) {
  if (!activity) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">{activity.title}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {activity.contentType === 'quiz' && <QuizView quizId={activity.quizId} onComplete={onClose} />}
          {activity.contentType === 'video' && <VideoView videoUrl={activity.contentUrl} />}
        </div>
      </div>
    </div>
  );
}
