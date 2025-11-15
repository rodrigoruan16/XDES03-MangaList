const UserService = require("../services/userService.js");

function create(req, res) {
	const { email, username, password } = req.body;

	const response = UserService.create(username, email, password);

	if (response.error) {
		const { code, error } = response;
		return res.status(code).json({ error });
	}

	res.status(200).json({ message: "Usuário criado com sucesso." });
}

function login(req, res) {
	const { email, password } = req.body;

	const response = UserService.login(email, password);

	if (response.error) {
		const { code, error } = response;
		return res.status(code).json({ error });
	}

	const { token } = response;

	res.cookie("token", token, { httpOnly: true, secure: true });
	res.status(200).json({ message: "Usuário logado com sucesso" });
}

module.exports = { create, login };
