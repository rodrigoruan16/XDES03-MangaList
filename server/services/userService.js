const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");

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

module.exports = {
	create,
};
