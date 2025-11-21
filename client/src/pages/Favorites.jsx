import React from "react";
import axios from "axios";
import Header from "../components/Header";
import { useNavigate } from "react-router";
import "../css/Favorites.css";

import MangaCard from "../components/MangaCard";

function Favorites() {
	const navigate = useNavigate();
	const [favorites, setFavorites] = React.useState([]);
	const [comments, setComments] = React.useState({});

	async function getFavorites() {
		try {
			const favorites_id = await axios({
				method: "GET",
				url: "http://localhost:3001/manga/favorite",
				withCredentials: true,
			}).then((res) => res.data?.favorites);

			let favorites_url = "https://api.mangadex.org/manga?includes[]=cover_art";

			favorites_id.forEach((favorite) => (favorites_url += `&ids[]=${favorite.manga_id}`));

			const favoritesFetched = await axios({
				method: "GET",
				url: favorites_url,
			});

			setFavorites(favoritesFetched?.data?.data);
		} catch (err) {
			const UNAUTHORIZED_STATUS = 401;
			if (err.status == UNAUTHORIZED_STATUS) {
				return navigate("/login");
			}
		}
	}

	function addComment(e, id) {
		e.preventDefault();

		if (!comments[id]) {
			return;
		}

		e.target[0].value = "";
		comments[id] = "";
	}

	React.useEffect(() => {
		if (!sessionStorage.getItem("user_logged")) {
			return navigate("/login");
		}
		getFavorites();
	}, []);

	return (
		<>
			<Header />
			<div className="favorites-container">
				{favorites.map((manga) => {
					const { attributes, relationships, id, type } = manga;
					const cover = relationships.find(({ type }) => type === "cover_art")?.attributes?.fileName;

					const mangaData = { ...attributes, id, type, relationships, cover, isFavoritesPage: 1 };

					return (
						<div key={id} className="manga-card-container">
							<MangaCard attributes={mangaData} />
							<form className="manga-review" onSubmit={(e) => addComment(e, id)}>
								<input
									placeholder="Adicione seu comentário aqui..."
									type="text"
									onChange={(e) => setComments({ ...comments, [id]: e.target.value })}
								/>
								<button>Enviar</button>
							</form>
							<section className="comments-section">
								<h3>Comentários</h3>

								<div className="comments-container"></div>
							</section>
						</div>
					);
				})}
			</div>
		</>
	);
}

export default Favorites;
