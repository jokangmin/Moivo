import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [tokenExpiration, setTokenExpiration] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // 토큰 만료 시간 계산
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = new Date(decodedToken.exp * 1000);
      setTokenExpiration(expirationTime);
    } else {
      setIsLoggedIn(false);
      setUser(null);

    }
  }, []);

  const login = async (formData) => {
    try {
      const response = await axios.post('/api/auth/login', formData);
      const token = response.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsLoggedIn(true);
      return true;
    } catch (error) {
      console.error('로그인 실패:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      user,
      tokenExpiration,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};