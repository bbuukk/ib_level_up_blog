import { Navigate, useLocation } from 'react-router-dom';
import { IsAuthorizedRequestStatus, useAuth } from './contexts/AuthProvider';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthorized } = useAuth();
  const location = useLocation();

  console.log('isAuthorized', isAuthorized);

  if (isAuthorized === IsAuthorizedRequestStatus.UNKNOWN) {
    return <div>Loading...</div>;
  } else if (isAuthorized === IsAuthorizedRequestStatus.NOT_AUTHORIZED) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
