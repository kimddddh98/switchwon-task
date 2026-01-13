import { getAccessToken } from '@/api/auth'
import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from './path'

const PublicRoute = () => {
  const token = getAccessToken()

  if (token) {
    return <Navigate to={ROUTES.EXCHANGE} replace />
  }

  return <Outlet />
}

export default PublicRoute
