import { createBrowserRouter } from 'react-router-dom'
import { ROUTES } from './path'
import Home from '@/pages/Home'
import SignIn from '@/pages/SignIn'
import Exchange from '@/pages/Exchange'
import ExchangeList from '@/pages/ExchangeList'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Home />,
  },
  {
    element: <PublicRoute />,
    children: [
      {
        path: ROUTES.SIGN_IN,
        element: <SignIn />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: ROUTES.EXCHANGE,
        element: <Exchange />,
      },
      {
        path: ROUTES.EXCHANGE_LIST,
        element: <ExchangeList />,
      },
    ],
  },
])
