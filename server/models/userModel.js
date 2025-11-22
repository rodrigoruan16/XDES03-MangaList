const fs = require("fs").promises;
const path = require("path");
const { randomUUID } = require("crypto");

const DB_PATH = path.join(__dirname, "../database/users-db.json");

async function create(username, email, password) {
	const data = JSON.parse(await fs.readFile(DB_PATH, "utf-8"));

	const newUser = {
		id: randomUUID(),
		username,
		email,
		password,
		avatar_url: "https://cdn.noitatnemucod.net/avatar/100x100/zoro_normal/av-zz-10.jpeg",
		active: true,
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
	};

	data.push(newUser);
	await fs.writeFile(DB_PATH, JSON.stringify(data));

	return newUser;
}

async function findByEmail(email) {
	const data = JSON.parse(await fs.readFile(DB_PATH, "utf-8"));
	const user = data.find((user) => user.email == email);
	return user;
}

async function findById(id) {
	const data = JSON.parse(await fs.readFile(DB_PATH, "utf-8"));
	const user = data.find((user) => user.id == id);
	return user;
}

module.exports = {
	create,
	findByEmail,
	findById,
};
