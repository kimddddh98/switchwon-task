import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { ROUTES } from './routes/path.ts'
import Home from './pages/Home.tsx'
import '@/global.css'
import SignIn from './pages/SignIn.tsx'
import Exchange from './pages/Exchange.tsx'
import ExchangeList from './pages/ExchangeList.tsx'
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Home />,
  },
  {
    path: ROUTES.SIGN_IN,
    element: <SignIn />,
  },
  {
    path: ROUTES.EXCHANGE,
    element: <Exchange />,
  },
  {
    path: ROUTES.EXCHANGE_LIST,
    element: <ExchangeList />,
  },
])

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
