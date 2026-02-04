// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ProductsProvider from './contexts/ProductsProvider.tsx'
import CategoriesProvider from './contexts/CategoriesProvider.tsx'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <ProductsProvider>
      <CategoriesProvider>
        <App />
      </CategoriesProvider>
    </ProductsProvider>
  // </StrictMode>
)
