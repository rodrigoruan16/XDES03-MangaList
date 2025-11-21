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

module.exports = { setFavorite, getFavorites };
