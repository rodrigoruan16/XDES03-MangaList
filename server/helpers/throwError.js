const throwError = (code, msg) => {
	const err = new Error(msg);
	err.status = code;
	throw err;
};

module.exports = {
	throwError,
};
