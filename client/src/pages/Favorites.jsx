import React from "react";
import axios from "axios";
import Header from "../components/Header";
import { useNavigate } from "react-router";
import "../css/Favorites.css";

function Favorites() {
	const navigate = useNavigate();

	// faz a requisição para pegar os favoritos, mas primeiro verifica se está logado no sessionStorage

	

	return (
		<>
			<Header />
			<div className="favorites-container">Favoritos</div>
		</>
	);
}

export default Favorites;
