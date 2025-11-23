const statusCode = require("../helpers/statusCode.js");
const UserService = require("../services/userService.js");
const { LoginSchema, RegisterSchema } = require("../schema/UserSchemas.js")

async function create(req, res) {
	await RegisterSchema.validate(req.body);
	const { email, username, password } = req.body;
	await UserService.create(username, email, password);
	res.status(statusCode.OK).json({
		message: "Usuário criado com sucesso.",
	});
}

async function login(req, res) {
	await LoginSchema.validate(req.body);
	const { email, password } = req.body;

	const response = await UserService.login(email, password);
	const { token, id, username, avatar_url } = response;

	res.cookie("token", token, {
		httpOnly: true,
		secure: false,
	});
	res.status(statusCode.OK).json({
		message: "Usuário logado com sucesso",
		user: { id, username, avatar_url },
	});
}

async function logout(_req, res) {
	res.clearCookie("token", {
		httpOnly: true,
		secure: false,
	});
	res.status(statusCode.OK).json({
		message: "Usuário deslogado com sucesso",
	});
}

async function getInfo(req, res) {
	const data = req.token;

	const response = await UserService.getInfo(data?.user?.id);

	res.status(statusCode.OK).json({
		message: "Informações do usuário carregadas com sucesso",
		user: response,
	});
}

module.exports = {
	create,
	login,
	logout,
	getInfo,
};
