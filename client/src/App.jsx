// App.js
import { BrowserRouter, Routes, Route } from "react-router";

import "./css/App.css";

import Mangas from "./pages/Mangas";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";

const App = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Mangas />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/favorites" element={<Favorites />} />
			<Route path="/profile" element={<Profile />} />
		</Routes>
	</BrowserRouter>
);

export default App;