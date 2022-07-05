import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';

export default function ProtectedRoute({ redirectPath = '/' }) {
  const { activeUser } = useUserContext();

  if (!activeUser) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}
