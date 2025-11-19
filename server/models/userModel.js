const fs = require("fs");
const path = require("path");
const { randomUUID } = require("crypto");

const DB_PATH = path.join(__dirname, "../database/users-db.json");

function create(username, email, password) {
	try {
		const data = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));

		const newUser = {
			id: randomUUID(),
			username,
			email,
			password,
			avatar_url:
				"https://cdn.noitatnemucod.net/avatar/100x100/zoro_normal/av-zz-10.jpeg",
			active: true,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		};

		data.push(newUser);

		fs.writeFileSync(DB_PATH, JSON.stringify(data));

		return newUser;
	} catch (err) {
		return { code: 500, error: err.message };
	}
}

function findByEmail(email) {
	try {
		const data = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));

		const user = data.find((user) => user.email == email);

		return user;
	} catch (err) {
		return { code: 500, error: err.message };
	}
}

function findById(id) {
	try {
		const data = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));

		const user = data.find((user) => user.id == id);

		return user;
	} catch (err) {
		return { code: 500, error: err.message };
	}
}

function updateUser(id, avatar_url, username, email) {
	try {
		const data = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));

		const user = data.find((user) => user.id == id);

		if (!user) {
			return { code: 404, error: "Usuário não encontrado." };
		}

		user["avatar_url"] = avatar_url;
		user["username"] = username;
		user["email"] = email;
		user["updated_at"] = new Date().toISOString();

		fs.writeFileSync(DB_PATH, JSON.stringify(data));

		return user;
	} catch (err) {
		return { code: 500, error: err.message };
	}
}

module.exports = {
	create,
	findByEmail,
	findById,
	updateUser,
};
