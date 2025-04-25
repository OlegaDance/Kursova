import './App.css'
import { Main } from './pages/Main/Main'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './component/Header/Header'

function App() {
	return (
		<div className='wrapper'>
			<Header />
			<div className='content'>
				<Routes>
					<Route path='/' element={<Main />} />
					
				</Routes>
			</div>
			{/* <Footer /> */}
		</div>
	)
}

export default App
