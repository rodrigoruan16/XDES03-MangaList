const MangaModel = require("../models/mangaModel");

const statusCode = require("../helpers/statusCode");

const error = (code, msg) => ({ code, error: msg });

const getFavorites = (user_id) => {
	const userFavorites = MangaModel.getFavorites(user_id);
	return userFavorites;
};

const setFavorite = (user_id, manga_id) => {
	const userFavorites = MangaModel.getFavorites(user_id);

	const alreadyFavorite = userFavorites.find(
		(favorite) => favorite.user_id == user_id && favorite.manga_id == manga_id
	);
	if (alreadyFavorite) return error(statusCode.BAD_REQUEST, "Mangá já favoritado");

	const favorited = MangaModel.setFavorite(user_id, manga_id);
	return favorited;
};

module.exports = {
	setFavorite,
	getFavorites,
};
