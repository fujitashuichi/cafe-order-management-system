// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import UrlProvider from './contexts/UrlProvider.tsx'
import ProductsProvider from './contexts/ProductsProvider.tsx'
import CategoriesProvider from './contexts/CategoriesProvider.tsx'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <UrlProvider>
      <ProductsProvider>
        <CategoriesProvider>
          <App />
        </CategoriesProvider>
      </ProductsProvider>
    </UrlProvider>
  // </StrictMode>
)
