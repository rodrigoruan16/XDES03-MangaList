const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET } = process.env;

function create(username, email, password) {
	const error = { code: 400, error: "E-mail já utilizado." };

	const emailAlreadyRegisitered = UserModel.findByEmail(email);

	if (emailAlreadyRegisitered) {
		return error;
	}

	const salt = bcrypt.genSaltSync(10);
	const hashedPassword = bcrypt.hashSync(password, salt);

	const response = UserModel.create(username, email, hashedPassword);

	return response;
}

function login(email, password) {
	const error = { code: 400, error: "Email ou senha incorretos" };

	const user = UserModel.findByEmail(email);

	if (!user) {
		return error;
	}

	const validPassword = bcrypt.compareSync(password, user.password);

	if (!validPassword) {
		return error;
	}

	const { id } = user;

	const token = jwt.sign({ user: { id, email } }, SECRET);

	return { token, id };
}

module.exports = {
	create,
	login,
};
