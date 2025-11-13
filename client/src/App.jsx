// App.js
import { BrowserRouter, Routes, Route } from "react-router";

import "./css/App.css";

import Header from "./components/Header";

import Mangas from "./pages/Mangas";
import Login from "./pages/Login";

const App = () => (
	<BrowserRouter>
		<Header />
		<Routes>
			<Route path="/" element={<Mangas />} />
			<Route path="/login" element={<Login />} />
		</Routes>
	</BrowserRouter>
);

export default App;
