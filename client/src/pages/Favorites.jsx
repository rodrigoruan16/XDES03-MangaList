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
			const favorited_mangas = await axios({
				method: "GET",
				url: "http://localhost:3001/manga/favorite",
				withCredentials: true,
			});
			const favorite_ids = favorited_mangas?.data?.favorites;

			let favorites_url = "https://api.mangadex.org/manga?includes[]=cover_art";
			favorite_ids.forEach((favorite) => (favorites_url += `&ids[]=${favorite.manga_id}`));

			const favoritesFetched = await axios({
				method: "GET",
				url: favorites_url,
			});

			const favoritesWithComments = favoritesFetched?.data?.data.map((favorite) => {
				favorite["comments"] = favorite_ids.find(({ manga_id }) => favorite.id == manga_id).comments;
				return favorite;
			});

			setFavorites(favoritesWithComments);
		} catch (err) {
			const UNAUTHORIZED_STATUS = 401;
			if (err.status == UNAUTHORIZED_STATUS) {
				return navigate("/login");
			}
		}
	}

	async function addComment(e, id) {
		e.preventDefault();

		if (!comments[id]) return;

		try {
			const res = await axios({
				method: "POST",
				url: "http://localhost:3001/manga/comment",
				data: {
					manga_id: id,
					comment: comments[id],
				},
				withCredentials: true,
			});

			console.log(comments[id]);
		} catch (err) {
			console.log(err);
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

								<div className="comments-container">
									{manga.comments.map(({ id, email, comment }) => (
										<>
											<p>{email}</p>
											<p className="comment" key={id}>
												{comment}
											</p>
										</>
									))}
								</div>
							</section>
						</div>
					);
				})}
			</div>
		</>
	);
}

export default Favorites;
