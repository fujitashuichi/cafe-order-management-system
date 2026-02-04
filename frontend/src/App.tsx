import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminPage from './components/Admin/AdminPage';
import HomePage from './components/User/HomePage';

function App() {

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<HomePage /> }/>
				<Route path='/admin' element={<AdminPage /> } />
			</Routes>
		</BrowserRouter>
	)
}

export default App
