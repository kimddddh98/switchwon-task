import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router/dom'
import '@/global.css'
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { router } from './routes/index.tsx'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Toast from './components/Toast.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
      <Toast />
    </QueryClientProvider>
  </React.StrictMode>,
)
