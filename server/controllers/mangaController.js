const statusCode = require("../helpers/statusCode.js");
const MangaService = require("../services/mangaService.js");

async function getFavorites(req, res) {
	const data = req.token;

	const response = await MangaService.getFavorites(data?.user?.id);

	res.status(statusCode.OK).json({
		user_id: data.user.id,
		favorites: response,
	});
}

async function setFavorite(req, res) {
	const data = req.token;

	const response = await MangaService.setFavorite(data?.user?.id, req.body?.manga_id);

	res.status(statusCode.OK).json({
		message: "Mangá favoritado com sucesso.",
		data: response,
	});
}

async function addComment(req, res) {
	const data = req.token;

	const response = await MangaService.addComment(
		data?.user?.id,
		data?.user?.email,
		req.body?.manga_id,
		req.body?.comment
	);

	res.status(statusCode.OK).json({
		message: "Comentário adicionado com sucesso.",
		data: response,
	});
}

async function removeComment(req, res) {
	const data = req.token;

	await MangaService.removeComment(data?.user?.id, req.body?.comment_id);

	res.status(statusCode.OK).json({
		message: "Comentário removido com sucesso.",
	});
}

async function removeFavorite(req, res) {
	const data = req.token;

	await MangaService.removeFavorite(data?.user?.id, req.body?.manga_id);

	res.status(statusCode.OK).json({
		message: "Manga removido dos favoritos com sucesso.",
	});
}

async function editComment(req, res) {
	const data = req.token;

	const response = await MangaService.editComment(data?.user?.id, req.body?.comment_id, req.body?.comment);

	res.status(statusCode.OK).json({
		message: "Comentário editado com sucesso.",
		data: response,
	});
}

module.exports = {
	setFavorite,
	getFavorites,
	addComment,
	removeComment,
	removeFavorite,
	editComment,
};
