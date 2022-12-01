import { Header } from "./components/header/Header";
import './styles/app.scss';
import {  Route, Routes } from 'react-router-dom';
import { Transfer } from "./pages/transfer/Transfer";
import { Mint } from "./pages/mint/Mint";

function App() {
	return <div className='app'>
		<Header/>
		<Routes>
			<Route path="/transfer" element={<Transfer/>} />
			<Route path="/mint" element={<Mint/>} />
		</Routes>
	</div>;
}

export default App;
