import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { mockUsers, addUser } from '../data/mockData';

const AuthContext = createContext(undefined);

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        user: null,
        token: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          token: storedToken,
          user: JSON.parse(storedUser),
        },
      });
    }
  }, []);

  const login = async (email, password) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (!user) {
        throw new Error('Invalid credentials');
      }

      const token = 'mock-jwt-token-for-' + user.email;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user, token },
      });
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const signup = async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const existingUser = mockUsers.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
    if (existingUser) {
      throw new Error('An account with this email already exists.');
    }
    
    const newUser = addUser(userData);
    const token = 'mock-jwt-token-for-' + newUser.email;
    
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(newUser));

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: { user: newUser, token },
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
