import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // JWT 토큰 관리
  const setToken = (token) => {
    if (token) {
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      checkLoginStatus();
    }
  }, []);

  const checkLoginStatus = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/user', {
        withCredentials: true
      });
      setIsLoggedIn(response.data.isLoggedIn);
      if (response.data.user) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('로그인 상태 확인 실패:', error);
      handleLogout();
    }
  };

  const handleLogin = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:8080/api/user/login', credentials);
      const { token, user } = response.data;
      setToken(token);
      setUser(user);
      setIsLoggedIn(true);
      return true;
    } catch (error) {
      console.error('로그인 실패:', error);
      return false;
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/api/user/logout', {}, {
        withCredentials: true
      });
    } catch (error) {
      console.error('로그아웃 실패:', error);
    } finally {
      setToken(null);
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      user,
      login: handleLogin,
      logout: handleLogout,
      checkLoginStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
};