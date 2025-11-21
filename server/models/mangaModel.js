const fs = require("fs");
const path = require("path");
const { randomUUID } = require("crypto");

const DB_FAVORITES_PATH = path.join(__dirname, "../database/favorites-db.json");
const DB_COMMENTS_PATH = path.join(__dirname, "../database/comments-db.json");

function getFavorites(user_id) {
	const data = JSON.parse(fs.readFileSync(DB_FAVORITES_PATH, "utf-8"));
	data.filter((favorite) => favorite.user_id == user_id);
	return data;
}

function setFavorite(user_id, manga_id) {
	const data = JSON.parse(fs.readFileSync(DB_FAVORITES_PATH, "utf-8"));

	const favoritedObject = {
		user_id,
		manga_id,
		favorited_at: new Date().toISOString(),
	};

	data.push(favoritedObject);
	fs.writeFileSync(DB_FAVORITES_PATH, JSON.stringify(data));

	return favoritedObject;
}

function getComments(mangas_id) {
	const data = JSON.parse(fs.readFileSync(DB_COMMENTS_PATH, "utf-8"));
	const filteredData = data.filter((comment) => mangas_id.includes(comment.manga_id));
	return filteredData;
}

function addComment(user_id, email, manga_id, comment) {
	const data = JSON.parse(fs.readFileSync(DB_COMMENTS_PATH, "utf-8"));

	const commentObject = {
		id: randomUUID(),
		user_id,
		manga_id,
		comment,
		email,
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
	};

	data.push(commentObject);
	fs.writeFileSync(DB_COMMENTS_PATH, JSON.stringify(data));

	return commentObject;
}

module.exports = {
	setFavorite,
	getFavorites,
	addComment,
	getComments,
};
