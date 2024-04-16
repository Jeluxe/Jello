import { Navigate } from 'react-router-dom';
import { useAuthProvider } from '../context/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthProvider()

  if (!isAuthenticated) {
    return <Navigate to="/" />
  }
  return children
}


export default ProtectedRoute