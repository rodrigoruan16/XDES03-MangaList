function userCreate(req, res) {
	const { username, email, password, confirmPassword } = req.body;

	console.log(req.body);

	res.status(200).send("OK");
}

function userLogin(req, res) {
	const { username, email, password, confirmPassword } = req.body;

	console.log(req.body);

	res.status(200).send("OK");
}

module.exports = { userCreate, userLogin };
