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

const getComments = (user_id) => {
	const comments = MangaModel.getComments(user_id);
	return comments;
};

const addComment = (user_id, email, manga_id, comment) => {
	const added_comment = MangaModel.addComment(user_id, email, manga_id, comment);
	return added_comment;
};

module.exports = {
	setFavorite,
	getFavorites,
	addComment,
	getComments,
};
