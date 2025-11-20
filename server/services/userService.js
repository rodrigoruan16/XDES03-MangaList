const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const statusCode = require("../helpers/statusCode");

const { SECRET } = process.env;

const error = (code, msg) => ({ code, error: msg });

const create = (username, email, password) => {
	const user = UserModel.findByEmail(email);
	if (user) return error(statusCode.BAD_REQUEST, "E-mail já utilizado");

	const salt = bcrypt.genSaltSync(10);
	const hashedPassword = bcrypt.hashSync(password, salt);

	const response = UserModel.create(username, email, hashedPassword);
	return response;
};

const login = (email, password) => {
	const user = UserModel.findByEmail(email);
	if (!user) return error(statusCode.BAD_REQUEST, "E-mail já utilizado");

	const validPassword = bcrypt.compareSync(password, user.password);
	if (!validPassword) return error;

	const { id, username, avatar_url } = user;

	const token = jwt.sign({ user: { id, email } }, SECRET);

	return { token, id, username, avatar_url };
};

const getInfo = (id) => {
	const user = UserModel.findById(id);

	if (!user || !user.active) return error(statusCode.BAD_REQUEST, "E-mail já utilizado");

	delete user["password"];
	delete user["active"];

	return user;
};

module.exports = {
	create,
	login,
	getInfo,
};
