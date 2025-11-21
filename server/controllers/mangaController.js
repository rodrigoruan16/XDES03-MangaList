const MangaService = require("../services/mangaService.js");

function getFavorites(req, res) {
	const data = req.token;

	const response = MangaService.getFavorites(data?.user?.id);

	if (response.error) {
		const { code, error } = response;
		return res.status(code).json({ error });
	}

	res.status(200).json({
		user_id: data.user.id,
		favorites: response,
	});
}

function setFavorite(req, res) {
	const data = req.token;

	const response = MangaService.setFavorite(data?.user?.id, req.body?.manga_id);

	if (response.error) {
		const { code, error } = response;
		return res.status(code).json({ error });
	}

	res.status(200).json({
		message: "Mangá favoritado com sucesso.",
		data: response,
	});
}

function addComment(req, res) {
	const data = req.token;

	const response = MangaService.addComment(data?.user?.id, data?.user?.email, req.body?.manga_id, req.body?.comment);

	if (response.error) {
		const { code, error } = response;
		return res.status(code).json({ error });
	}

	res.status(200).json({
		message: "Comentário adicionado com sucesso.",
		data: response,
	});
}

function removeComment(req, res) {
	const data = req.token;

	MangaService.removeComment(data?.user?.id, req.body?.comment_id);

	res.status(200).json({
		message: "Comentário removido com sucesso.",
	});
}

module.exports = { setFavorite, getFavorites, addComment, removeComment };
