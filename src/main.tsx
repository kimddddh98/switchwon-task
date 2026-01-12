import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { ROUTES } from './routes/path.ts'
import Home from './pages/Home.tsx'
import '@/global.css'
import SignIn from './pages/SignIn.tsx'

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Home />,
  },
  {
    path: ROUTES.SIGN_IN,
    element: <SignIn />,
  },
])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
)
