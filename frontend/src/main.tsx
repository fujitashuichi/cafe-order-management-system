import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PortProvider } from './contexts/PortContextProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PortProvider>
      <App />
    </PortProvider>
  </StrictMode>
)
