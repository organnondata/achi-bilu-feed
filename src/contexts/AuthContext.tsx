import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { currentUser, User } from '@/data/mockData';

interface AuthContextType {
  isAuthenticated: boolean;
  isFaceVerified: boolean;
  user: User | null;
  login: () => void;
  logout: () => void;
  setFaceVerified: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isFaceVerified: false,
  user: null,
  login: () => {},
  logout: () => {},
  setFaceVerified: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('acheibilu_auth') === 'true');
  const [isFaceVerified, setIsFaceVerified] = useState(() => localStorage.getItem('acheibilu_face') === 'true');

  useEffect(() => {
    localStorage.setItem('acheibilu_auth', String(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('acheibilu_face', String(isFaceVerified));
  }, [isFaceVerified]);

  const login = () => setIsAuthenticated(true);
  const logout = () => {
    setIsAuthenticated(false);
    setIsFaceVerified(false);
    localStorage.removeItem('acheibilu_auth');
    localStorage.removeItem('acheibilu_face');
  };
  const setFaceVerified = (value: boolean) => setIsFaceVerified(value);

  const user = isAuthenticated ? currentUser : null;

  return (
    <AuthContext.Provider value={{ isAuthenticated, isFaceVerified, user, login, logout, setFaceVerified }}>
      {children}
    </AuthContext.Provider>
  );
};
