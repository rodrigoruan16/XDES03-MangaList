const MangaModel = require("../models/mangaModel");

const statusCode = require("../helpers/statusCode");

const error = (code, msg) => ({ code, error: msg });

const getFavorites = (user_id) => {
	const userFavorites = MangaModel.getFavorites(user_id);
	const comments = MangaModel.getComments(userFavorites.map((favorite) => favorite.manga_id));

	const favoritesWithComments = userFavorites.map((favorite) => {
		favorite["comments"] = comments.filter((comment) => favorite.manga_id == comment.manga_id);
		return favorite;
	});

	return favoritesWithComments;
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

const addComment = (user_id, email, manga_id, comment) => {
	const added_comment = MangaModel.addComment(user_id, email, manga_id, comment);
	return added_comment;
};

const removeComment = (user_id, comment_id) => {
	MangaModel.removeComment(user_id, comment_id);
};

module.exports = {
	setFavorite,
	getFavorites,
	addComment,
	removeComment,
};
