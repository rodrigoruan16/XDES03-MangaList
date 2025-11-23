const statusCode = require("../helpers/statusCode");

function errorHandler(err, _req, res, _next) {
	return res.status(err?.status || statusCode.BAD_REQUEST).json({
		error: err?.message || "Erro interno no servidor",
	});
}

module.exports = {
	errorHandler,
};
