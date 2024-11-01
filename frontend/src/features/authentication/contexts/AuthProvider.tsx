import { createContext, useContext, useEffect, useState } from 'react';
import { getMe, login } from 'utils/axios';
import LoginForm from '../types/LoginForm';
import ApiUser from 'types/ApiUser';

interface AuthContextType {
  isAuthorized: IsAuthorizedRequestStatus;
  login: (data: LoginForm) => Promise<void>;
  logout: () => void;
}

export enum IsAuthorizedRequestStatus {
  UNKNOWN = 'unknown',
  AUTHORIZED = 'true',
  NOT_AUTHORIZED = 'false'
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthorized, setIsAuthorized] = useState(
    IsAuthorizedRequestStatus.UNKNOWN
  );
  const [user, setUser] = useState<ApiUser | null>(null);

  const fetchLogin = async (data: LoginForm) => {
    try {
      const response = await login(data);
      console.log('awaited response received', response);

      localStorage.setItem('token', response.token);
      setIsAuthorized(IsAuthorizedRequestStatus.AUTHORIZED);
    } catch (error) {
      console.error('Error logging in', error);
      setIsAuthorized(IsAuthorizedRequestStatus.NOT_AUTHORIZED);
    }
  };

  // Fetch the user on mount, so we determine if the user is logged in
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const data = await getMe();

        setUser(data);
        setIsAuthorized(IsAuthorizedRequestStatus.AUTHORIZED);
      } catch (error) {
        setUser(null);
        setIsAuthorized(IsAuthorizedRequestStatus.NOT_AUTHORIZED);
      }
    };

    fetchMe();
  }, []);

  const logout = () => {
    const sendLogoutRequest = async () => {
      try {
        // TODO - not implemented on the backend
        /*         await axios({
          method: 'POST',
          url: '/api/logout'
        }); */

        setUser(null);
        localStorage.removeItem('token');
      } catch (error) {
        console.error('Error logging out', error);
      } finally {
        setIsAuthorized(IsAuthorizedRequestStatus.NOT_AUTHORIZED);
      }
    };

    sendLogoutRequest();
  };

  return (
    <AuthContext.Provider value={{ isAuthorized, login: fetchLogin, logout }}>
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
