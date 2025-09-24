import React, { useState } from 'react';
import { mockQuizzes } from '../../data/mockData';
import { CheckCircle, XCircle, ArrowLeft, ArrowRight } from 'lucide-react';

export function QuizView({ quizId, onComplete }) {
  const quiz = mockQuizzes[quizId];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(quiz.questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerSelect = (optionIndex) => {
    if (submitted) return;
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const score = userAnswers.reduce((acc, answer, index) => {
    return answer === quiz.questions[index].answer ? acc + 1 : acc;
  }, 0);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  if (submitted) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
        <p className="text-lg mb-6">You scored {score} out of {quiz.questions.length}</p>
        <button onClick={onComplete} className="bg-blue-600 text-white py-2 px-6 rounded-md">Close</button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-800">{currentQuestion.question}</h3>
      
      <div className="space-y-3">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            className={`w-full text-left p-4 border rounded-lg transition-all duration-200 flex items-center
              ${userAnswers[currentQuestionIndex] === index ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-300 hover:bg-gray-50'}`}
          >
            <span className={`w-6 h-6 rounded-full border-2 mr-4 flex-shrink-0 ${userAnswers[currentQuestionIndex] === index ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}></span>
            {option}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center pt-4">
        <button 
          onClick={() => setCurrentQuestionIndex(i => i - 1)} 
          disabled={currentQuestionIndex === 0}
          className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md disabled:opacity-50 flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Previous
        </button>
        {currentQuestionIndex === quiz.questions.length - 1 ? (
          <button onClick={handleSubmit} className="bg-green-600 text-white py-2 px-6 rounded-md">Submit</button>
        ) : (
          <button 
            onClick={() => setCurrentQuestionIndex(i => i + 1)} 
            disabled={userAnswers[currentQuestionIndex] === null}
            className="bg-blue-600 text-white py-2 px-4 rounded-md disabled:opacity-50 flex items-center"
          >
            Next <ArrowRight className="h-4 w-4 ml-1" />
          </button>
        )}
      </div>
    </div>
  );
}
