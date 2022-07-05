import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext';

export default function AdminRoute({ redirectPath = '/' }) {
  const { activeUser } = useUserContext();

  if (activeUser.role !== 'admin') {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}
