import { useEffect, useState } from 'react'
import './App.css'
import { usePorts } from './contexts/PortContext';
import type { Product } from './types/Types';

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
	} ,[]);

	return (
		<>
			<h2>Products</h2>
			<dl>
				{products.map((item, index) => {
					<div key={index}>
						<dt>{item.name}</dt>
						<dd>{item.price}</dd>
					</div>
				})}
			</dl>
		</>
	)
}

export default App
