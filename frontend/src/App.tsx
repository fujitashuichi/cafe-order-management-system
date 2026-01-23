import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { usePorts } from './contexts/PortContext';
import type { Product } from './types/Types';
import AdminPage from './components/AdminPage';

function App() {
	const { backend: backendPort } = usePorts();
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		fetch(`http://localhost:${backendPort}/api/products`, {
			method: "GET",
			headers: { "Content-type": "application/json" }
		})
			.then(res => res.json())
			.then(data => setProducts(data))
			.catch(err => console.error("通信失敗:", err));
	} ,[backendPort]);

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/products' element={
					<>
						<h2>Products</h2>
						<dl>
							{products.map((item, index) =>
								<div key={index}>
									<dt>{item.name}</dt>
									<dd>{item.price}</dd>
								</div>
							)}
						</dl>
					</>}
				/>
				<Route path='/admin' element={<AdminPage />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
