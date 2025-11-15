const jwt = require("jsonwebtoken");

const { SECRET } = process.env;

function AuthMiddleware(req, res, next) {
	const error = { code: 401, message: "Token inválido ou expirado" };
	const token = req.cookies.token;

	if (!token) {
		return res.status(error.code).json({ error: error.message });
	}

	try {
		const decoded = jwt.verify(token, SECRET);
		console.log(decoded);
		next();
	} catch (_err) {
		return res.status(error.code).json({ error: error.message });
	}
}

module.exports = {
	AuthMiddleware,
};
