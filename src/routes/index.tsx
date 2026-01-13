import { createBrowserRouter } from 'react-router-dom'
import { ROUTES } from './path'
import Home from '@/pages/Home'
import SignIn from '@/pages/SignIn'
import Exchange from '@/pages/Exchange'
import ExchangeList from '@/pages/ExchangeList'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import ExchangeLayout from '@/components/ExchangeLayout'

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
        element: <ExchangeLayout />,
        children: [
          {
            path: ROUTES.EXCHANGE,
            element: <Exchange />,
            handle: {
              title: '환율 정보',
              description: '실시간 환율을 확인하고 간편하게 환전하세요.',
            },
          },
          {
            path: ROUTES.EXCHANGE_LIST,
            element: <ExchangeList />,
            handle: {
              title: '환전 내역',
              description: '환전 내역을 확인하실 수 있어요.',
            },
          },
        ],
      },
    ],
  },
])
