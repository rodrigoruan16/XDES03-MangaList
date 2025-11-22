const statusCode = require("../helpers/statusCode");

function errorHandler(err, _req, res, _next) {
	if (err.code && err.message) {
		return res.status(err.code).json({ error: err.message });
	}

	return res.status(statusCode.INTERNAL_ERROR).json({
		error: "Erro interno no servidor",
	});
}

module.exports = {
	errorHandler,
};
