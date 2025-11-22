const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const statusCode = require("../helpers/statusCode");

const { SECRET } = process.env;

const error = (code, msg) => ({ code, error: msg });

async function create(username, email, password) {
	const user = await UserModel.findByEmail(email);
	if (user) return error(statusCode.BAD_REQUEST, "E-mail já utilizado");

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	return await UserModel.create(username, email, hashedPassword);
}

async function login(email, password) {
	const user = await UserModel.findByEmail(email);
	const defaultError = error(statusCode.BAD_REQUEST, "E-mail ou senha inválidos");

	if (!user) return defaultError;

	const validPassword = await bcrypt.compare(password, user.password);
	if (!validPassword) return defaultError;

	const { id, username, avatar_url } = user;

	const token = jwt.sign({ user: { id, email } }, SECRET, { expiresIn: "7d" });

	return { token, id, username, avatar_url };
}

async function getInfo(id) {
	const user = await UserModel.findById(id);

	if (!user || !user.active) return error(statusCode.NOT_FOUND, "Usuário não encontrado");

	const { password, active, ...publicData } = user;

	return publicData;
}

module.exports = {
	create,
	login,
	getInfo,
};
