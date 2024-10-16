import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

// Define the props type for PrivateRoute
interface PrivateRouteProps {
  children: ReactNode; // Specify that children should be of type ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token'); // Check for token or authenticated user state
  return token ? <>{children}</> : <Navigate to="/" />;
};

export default PrivateRoute;