// App.js
import { BrowserRouter, Routes, Route } from "react-router";

import "./css/App.css";

import Header from "./components/Header";

import Mangas from "./pages/Mangas";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => (
	<BrowserRouter>
		<Header />
		<Routes>
			<Route path="/" element={<Mangas />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
		</Routes>
	</BrowserRouter>
);

export default App;
