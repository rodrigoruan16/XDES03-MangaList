const MangaModel = require("../models/mangaModel");

const statusCode = require("../helpers/statusCode");

const getFavorites = async (user_id) => {
	const userFavorites = await MangaModel.getFavorites(user_id);
	const comments = await MangaModel.getComments(
		userFavorites.map((favorite) => favorite.manga_id)
	);

	const favoritesWithComments = userFavorites.map((favorite) => {
		favorite["comments"] = comments.filter((comment) => favorite.manga_id == comment.manga_id);
		return favorite;
	});

	return favoritesWithComments;
};

const setFavorite = async (user_id, manga_id) => {
	const userFavorites = await MangaModel.getFavorites(user_id);

	const alreadyFavorite = userFavorites.find(
		(favorite) => favorite.user_id == user_id && favorite.manga_id == manga_id
	);
	if (alreadyFavorite) return { code: statusCode.CONFLICT, error: "Mangá já favoritado" };

	return await MangaModel.setFavorite(user_id, manga_id);
};

const addComment = async (user_id, email, manga_id, comment) => {
	return await MangaModel.addComment(user_id, email, manga_id, comment);
};

const removeComment = async (user_id, comment_id) => {
	await MangaModel.removeComment(user_id, comment_id);
};

const removeFavorite = async (user_id, manga_id) => {
	await MangaModel.removeFavorite(user_id, manga_id);
};

const editComment = async (user_id, comment_id, new_comment) => {
	await MangaModel.editComment(user_id, comment_id, new_comment);
};

module.exports = {
	setFavorite,
	getFavorites,
	addComment,
	removeComment,
	removeFavorite,
	editComment,
};
