/* eslint-disable react-refresh/only-export-components */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const queryClient = new QueryClient()

const ReactQueryDevtoolsProduction = lazy(() =>
  import('@tanstack/react-query-devtools/production').then((module) => ({
    default: module.ReactQueryDevtools,
  })),
)

function bootstrapApp() {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
        {import.meta.env.DEV ? (
          <ReactQueryDevtools initialIsOpen={false} />
        ) : (
          <Suspense fallback={null}>
            <ReactQueryDevtoolsProduction initialIsOpen={false} />
          </Suspense>
        )}
      </QueryClientProvider>
    </StrictMode>,
  )
}

bootstrapApp()
