import React from "react";
import "../css/MangaCard.css";
import { useNavigate } from "react-router";
import { addMangaToFavorite, removeMangaFromFavorite } from "../services/mangaService";

function capitalize(word) {
	if (!word) return "";
	return word.charAt(0).toUpperCase() + word.slice(1);
}

function MangaCard({ attributes }) {
	const navigate = useNavigate();
	const [favorited, setFavorited] = React.useState(false);

	async function addToFavorites() {
		if (!sessionStorage.getItem("user_logged")) return navigate("/login");
		if (favorited) return;

		try {
			await addMangaToFavorite(attributes.id);
		} catch (err) {
			const UNAUTHORIZED_STATUS = 401;
			if (err.status == UNAUTHORIZED_STATUS) {
				sessionStorage.clear();
				return navigate("/login");
			}
		}

		setFavorited(true);
	}

	async function removeFavorite() {
		await removeMangaFromFavorite(attributes.id);
		const { favorites, setFavorites } = attributes;
		setFavorites(favorites.filter((favorite) => favorite.id != attributes.id));
	}

	return (
		<div className="manga-card">
			<div className="manga-card-img-container">
				<img
					alt="capa mangá"
					src={`https://uploads.mangadex.org/covers/${attributes.id}/${attributes.cover}.256.jpg`}
				></img>
			</div>

			<div className="manga-attributes">
				<div className="title-container">
					<p className="manga-title">{Object.values(attributes.title)[0]}</p>
					<span
						onClick={attributes?.isFavoritesPage ? removeFavorite : addToFavorites}
						className="favorite-span"
					>
						<img
							alt="icone de favoritar"
							src={
								attributes?.isFavoritesPage
									? "https://img.icons8.com/?size=100&id=KPhFC2OwpbWV&format=png&color=FF0000"
									: favorited
									? "https://img.icons8.com/?size=100&id=10287&format=png&color=A53BD9"
									: "https://img.icons8.com/?size=100&id=581&format=png&color=A53BD9"
							}
						/>
					</span>
				</div>
				<div className="manga-info">
					<p>
						<img
							alt="icone do ano de lançamento do mangá"
							id="calendar"
							src="https://img.icons8.com/?size=100&id=10053&format=png&color=ffffff"
						></img>
						{attributes.year}
					</p>
					<p>{capitalize(attributes?.publicationDemographic)} </p>
					<p className="manga-card-status">
						<span className={`${attributes?.status}-status`}>&#9679;</span>
						{capitalize(attributes?.status)}
					</p>
				</div>
				<div className="tags-container">
					{attributes.tags.slice(0, 4).map((tag, idx) => {
						return <p key={idx}>{tag?.attributes?.name?.en}</p>;
					})}
				</div>
				<p className="manga-desc">
					{attributes?.description?.en
						? attributes?.description?.en
						: Object.values(attributes.description)[0]}
				</p>
			</div>
		</div>
	);
}

export default MangaCard;
