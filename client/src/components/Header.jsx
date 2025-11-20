import { Link } from "react-router";
import "../css/Header.css";

function Header() {
	const user_info = JSON.parse(sessionStorage.getItem("user_info"));
	const user_logged = sessionStorage.getItem("user_logged");

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
				<a className="nav-link" target="_blank" href="https://mangadex.org/">
					Mangadex
				</a>
			</div>

			<div className="user-info">
				<Link id="user-container" to={user_logged ? "/profile" : "/login"}>
					<img
						className="user-avatar"
						src={
							user_logged && user_info?.avatar_url
								? user_info.avatar_url
								: "https://img.icons8.com/?size=100&id=15263&format=png&color=ffffff"
						}
					/>
				</Link>
			</div>
		</header>
	);
}

export default Header;
