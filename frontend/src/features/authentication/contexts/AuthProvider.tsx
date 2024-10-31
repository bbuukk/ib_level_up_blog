import { createContext, useContext, useState } from 'react';
import { login } from 'utils/axios';
import LoginForm from '../types/LoginForm';

interface AuthContextType {
  isAuthorized: boolean;
  login: (data: LoginForm) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const sendLoginRequest = (data: LoginForm) => {
    const fetchLogin = async () => {
      try {
        const response = await login(data);

        localStorage.setItem('token', response.token);
        setIsAuthorized(true);
      } catch (error) {
        console.error('Error logging in', error);
        setIsAuthorized(false);
      }
    };

    fetchLogin();
  };

  const logout = () => {
    // logout logic
  };

  return (
    <AuthContext.Provider
      value={{ isAuthorized, login: sendLoginRequest, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
