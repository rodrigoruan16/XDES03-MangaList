import React from "react";
import axios from "axios";

import Header from "../components/Header";

import "../css/Favorites.css";

import { useNavigate } from "react-router";

function Favorites() {
	const navigate = useNavigate();

	return (
		<>
			<Header />
			<div className="favorites-container">Favoritos</div>
		</>
	);
}

export default Favorites;
