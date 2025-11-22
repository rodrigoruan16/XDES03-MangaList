const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const statusCode = require("../helpers/statusCode");
const { throwError } = require("../helpers/throwError");

const { SECRET } = process.env;

async function create(username, email, password) {
	const user = await UserModel.findByEmail(email);

	if (user) throwError(statusCode.CONFLICT, "E-mail já utilizado");

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	return await UserModel.create(username, email, hashedPassword);
}

async function login(email, password) {
	const user = await UserModel.findByEmail(email);
	const error_message = "E-mail ou senha inválidos";

	if (!user) throwError(statusCode.UNAUTHORIZED, error_message);

	const validPassword = await bcrypt.compare(password, user.password);
	if (!validPassword) throwError(statusCode.UNAUTHORIZED, error_message);

	const { id, username, avatar_url } = user;

	const token = jwt.sign({ user: { id, email } }, SECRET, { expiresIn: "7d" });

	return { token, id, username, avatar_url };
}

async function getInfo(id) {
	const user = await UserModel.findById(id);

	if (!user || !user.active) throwError(statusCode.NOT_FOUND, "Usuário não encontrado");

	const { password, active, ...publicData } = user;

	return publicData;
}

module.exports = {
	create,
	login,
	getInfo,
};
