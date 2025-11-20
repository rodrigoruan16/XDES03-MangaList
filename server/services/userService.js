const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET } = process.env;

function create(username, email, password) {
	const error = { code: 400, error: "E-mail já utilizado." };

	try {
		const user = UserModel.findByEmail(email);

		if (user) {
			return error;
		}

		const salt = bcrypt.genSaltSync(10);
		const hashedPassword = bcrypt.hashSync(password, salt);

		const response = UserModel.create(username, email, hashedPassword);

		return response;
	} catch (err) {
		error["error"] = err.message;
		return error;
	}
}

function login(email, password) {
	const error = { code: 400, error: "Email ou senha incorretos" };

	const user = UserModel.findByEmail(email);

	if (user?.error) return user;
	if (!user) return error;

	const validPassword = bcrypt.compareSync(password, user.password);

	if (!validPassword) {
		return error;
	}

	const { id, username, avatar_url } = user;

	const token = jwt.sign({ user: { id, email } }, SECRET);

	return { token, id, username, avatar_url };
}

function getInfo(id) {
	const error = { code: 400, error: "Não foi possível fazer a requisição" };

	const user = UserModel.findById(id);

	if (user?.error) return user;
	if (!user || !user.active) return error;

	delete user["password"];
	delete user["active"];

	return user;
}

module.exports = {
	create,
	login,
	getInfo,
};
