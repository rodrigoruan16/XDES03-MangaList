const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "../database/favorites-db.json");

function getFavorites(user_id) {
	const data = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
	data.filter((favorite) => favorite.user_id == user_id);
	return data;
}

function setFavorite(user_id, manga_id) {
	const data = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));

	const favoritedObject = {
		user_id,
		manga_id,
		favorited_at: new Date().toISOString(),
	};

	data.push(favoritedObject);
	fs.writeFileSync(DB_PATH, JSON.stringify(data));

	return favoritedObject;
}

module.exports = {
	setFavorite,
	getFavorites,
};
