const UserService = require("../services/userService.js");

function create(req, res) {
	const { email, username, password } = req.body;

	const response = UserService.create(username, email, password);

	if (response.error) {
		const { code, error } = response;
		console.log(error);
		return res.status(code).json({ error });
	}

	res.status(200).json({ message: "Usuário criado com sucesso." });
}

function login(req, res) {
	const { email, password } = req.body;

	//const response = await UserService.login();

	res.status(200).send("OK");
}

module.exports = { create, login };
