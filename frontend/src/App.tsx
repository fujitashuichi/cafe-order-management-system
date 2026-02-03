import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminPage from './components/AdminPage';
import HomePage from './components/HomePage';
import ProductBoundary from './components/boundary/ProductBoundary';
import CategoryBoundary from './components/boundary/CategoryBoundary';

function App() {

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<HomePage /> }/>
				<Route path='/admin' element={
					<ProductBoundary>
						<CategoryBoundary>
							<AdminPage />
						</CategoryBoundary>
					</ProductBoundary>
				} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
