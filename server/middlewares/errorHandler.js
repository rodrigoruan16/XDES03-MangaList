const statusCode = require("../helpers/statusCode");

function errorHandler(err, _req, res, _next) {
	if (err.status) {
		return res.status(err.status).json({ error: err.message || "Erro inesperado" });
	}

	return res.status(statusCode.INTERNAL_ERROR).json({
		error: "Erro interno no servidor",
	});
}

module.exports = {
	errorHandler,
};
