import { getAccessToken } from '@/api/auth'
import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from './path'

const ProtectedRoute = () => {
  const token = getAccessToken()

  if (!token) {
    return <Navigate to={ROUTES.SIGN_IN} replace />
  }

  return <Outlet />
}
export default ProtectedRoute
