import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools/production'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { scan } from 'react-scan'
import App from './App.tsx'
import './index.css'

scan({
  enabled: false,
  dangerouslyForceRunInProduction: true,
})

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={true} position="right" />
    </QueryClientProvider>
  </StrictMode>,
)
