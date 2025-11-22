const fs = require("fs").promises;
const path = require("path");
const { randomUUID } = require("crypto");

const DB_FAVORITES_PATH = path.join(__dirname, "../database/favorites-db.json");
const DB_COMMENTS_PATH = path.join(__dirname, "../database/comments-db.json");

async function getFavorites(user_id) {
	const data = JSON.parse(await fs.readFile(DB_FAVORITES_PATH, "utf-8"));
	const dataFiltered = data.filter((favorite) => favorite.user_id === user_id);
	return dataFiltered;
}

async function setFavorite(user_id, manga_id) {
	const data = JSON.parse(await fs.readFile(DB_FAVORITES_PATH, "utf-8"));

	const favoritedObject = {
		user_id,
		manga_id,
		favorited_at: new Date().toISOString(),
	};

	data.push(favoritedObject);
	await fs.writeFile(DB_FAVORITES_PATH, JSON.stringify(data));

	return favoritedObject;
}

async function getComments(manga_ids) {
	const data = JSON.parse(await fs.readFile(DB_COMMENTS_PATH, "utf-8"));
	const filteredData = data.filter((comment) => manga_ids.includes(comment.manga_id));
	return filteredData;
}

async function addComment(user_id, email, manga_id, comment) {
	const data = JSON.parse(await fs.readFile(DB_COMMENTS_PATH, "utf-8"));

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
	await fs.writeFile(DB_COMMENTS_PATH, JSON.stringify(data));

	return commentObject;
}

async function removeComment(user_id, comment_id) {
	const data = JSON.parse(await fs.readFile(DB_COMMENTS_PATH, "utf-8"));
	const filteredData = data.filter(
		(comment) => !(comment_id === comment.id && comment.user_id === user_id)
	);
	await fs.writeFile(DB_COMMENTS_PATH, JSON.stringify(filteredData));
}

async function removeFavorite(user_id, manga_id) {
	const raw = await fs.readFile(DB_FAVORITES_PATH, "utf-8");
	const data = JSON.parse(raw);

	const filteredData = data.filter(
		(favorite) => !(favorite.manga_id === manga_id && favorite.user_id === user_id)
	);

	await fs.writeFile(DB_FAVORITES_PATH, JSON.stringify(filteredData));
}

async function editComment(user_id, comment_id, new_comment) {
	const data = JSON.parse(await fs.readFile(DB_COMMENTS_PATH, "utf-8"));
	const modifiedData = data.map((comment) => {
		if (comment_id === comment.id && comment.user_id === user_id) {
			comment["comment"] = new_comment;
			comment["updated_at"] = new Date().toISOString();
		}

		return comment;
	});

	await fs.writeFile(DB_COMMENTS_PATH, JSON.stringify(modifiedData));
}

module.exports = {
	setFavorite,
	getFavorites,
	addComment,
	getComments,
	removeComment,
	removeFavorite,
	editComment,
};
