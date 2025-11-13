import React from "react";
import { Link } from "react-router";

import "../css/Header.css";

function Header() {
	return (
		<header>
			<Link id="logo-container" to="/">
				<img src="https://img.icons8.com/?size=100&id=p6iYcd56bUym&format=png&color=000000"></img>
			</Link>

			<div id="links-container">
				<Link className="nav-link" to="/">
					Mangás
				</Link>
				<Link className="nav-link" to="/favorites">
					Favoritos
				</Link>
				<Link className="nav-link" to="/mangadex">
					Mangadex
				</Link>
			</div>

			<Link id="user-container" to="/login">
				<img src="https://img.icons8.com/?size=100&id=15263&format=png&color=ffffff"></img>
			</Link>
		</header>
	);
}

export default Header;
