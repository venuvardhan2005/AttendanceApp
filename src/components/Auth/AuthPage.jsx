import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

export function AuthPage() {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {isLoginView ? (
        <LoginForm onSwitchToSignup={() => setIsLoginView(false)} />
      ) : (
        <SignupForm onSwitchToLogin={() => setIsLoginView(true)} />
      )}
    </div>
  );
}
