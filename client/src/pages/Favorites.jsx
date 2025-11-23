import React from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router";
import "../css/Favorites.css";
import MangaCard from "../components/MangaCard";
import {
	addMangaComment,
	deleteMangaComment,
	getFavoriteMangas,
	getFavoritesMangadex,
	updateMangaComment,
} from "../services/mangaService";

function Favorites() {
	const navigate = useNavigate();
	const [userId, setUserId] = React.useState(null);
	const [favorites, setFavorites] = React.useState([]);
	const [comments, setComments] = React.useState({});
	const [editMode, setEditMode] = React.useState({});
	const [loading, setLoading] = React.useState(false);

	async function getFavorites() {
		setLoading(true);
		try {
			const favorited_mangas = await getFavoriteMangas();
			const favorite_ids = favorited_mangas?.data?.favorites;
			if (favorite_ids?.length == 0) return;

			const favoritesFetched = await getFavoritesMangadex(favorite_ids);
			const favoritesWithComments = favoritesFetched?.data?.data.map((favorite) => {
				favorite["comments"] = favorite_ids.find(({ manga_id }) => favorite.id == manga_id)?.comments || [];
				return favorite;
			});

			setFavorites(favoritesWithComments);
		} catch (err) {
			const UNAUTHORIZED_STATUS = 401;
			if (err.status == UNAUTHORIZED_STATUS) {
				return navigate("/login");
			}
		} finally {
			setLoading(false);
		}
	}

	async function addComment(e, id) {
		e.preventDefault();
		if (!comments[id]) return;

		await addMangaComment(id, comments[id]);

		e.target[0].value = "";
		comments[id] = "";

		getFavorites();
	}

	async function updateComment(id) {
		if (!comments[id]) return;

		await updateMangaComment(id, comments[id]);

		getFavorites();
		setEditMode({ ...editMode, [id]: false });
	}

	async function removeComment(comment_id) {
		await deleteMangaComment(comment_id);
		getFavorites();
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
				<p className="favorite-message">
					{loading ? "Carregando..." : favorites.length == 0 && "Nenhum favorito encontrado"}
				</p>
				{favorites.map((manga) => {
					const { attributes, relationships, id, type } = manga;
					const cover = relationships.find(({ type }) => type === "cover_art")?.attributes?.fileName;
					const mangaData = {
						...attributes,
						id,
						type,
						relationships,
						cover,
						isFavoritesPage: 1,
						setFavorites,
						favorites,
					};
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
									{manga?.comments.map(({ id, user_id, email, comment }) => (
										<div key={id}>
											<div className="comment-info">
												<p>{email}</p>
												{user_id == userId && (
													<div className="edit-comment-container">
														<button
															onClick={() =>
																!editMode[id]
																	? setEditMode({ ...editMode, [id]: true })
																	: updateComment(id)
															}
															className="edit-comment-button"
														>
															{editMode[id] ? "Salvar" : "Editar"}
														</button>
														<button
															onClick={() => removeComment(id)}
															className="remove-comment-button"
														>
															Excluir
														</button>
													</div>
												)}
											</div>
											{editMode[id] ? (
												<input
													onChange={(e) => setComments({ ...comments, [id]: e.target.value })}
													className="comment-input"
													defaultValue={comment}
												/>
											) : (
												<p className="comment" key={id}>
													{comment}
												</p>
											)}
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
