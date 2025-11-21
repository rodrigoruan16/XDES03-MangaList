import React from "react";
import axios from "axios";
import Header from "../components/Header";
import { useNavigate } from "react-router";
import "../css/Favorites.css";

import MangaCard from "../components/MangaCard";

function Favorites() {
	const navigate = useNavigate();
	const [userId, setUserId] = React.useState(null);
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
			await axios({
				method: "POST",
				url: "http://localhost:3001/manga/comment",
				data: {
					manga_id: id,
					comment: comments[id],
				},
				withCredentials: true,
			});

			e.target[0].value = "";
			comments[id] = "";

			getFavorites();
		} catch (err) {
			console.log(err);
		}
	}

	React.useEffect(() => {
		if (!sessionStorage.getItem("user_logged")) {
			return navigate("/login");
		}
		setUserId(JSON.parse(sessionStorage.getItem("user_info")).id);
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
									{manga.comments.map(({ id, user_id, email, comment }) => (
										<div key={id}>
											<div className="comment-info">
												<p>{email}</p>

												{user_id == userId && (
													<div className="edit-comment-container">
														<button className="edit-comment-button">Editar</button>
														<button className="remove-comment-button">Excluir</button>
													</div>
												)}
											</div>
											<p className="comment" key={id}>
												{comment}
											</p>
										</div>
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
