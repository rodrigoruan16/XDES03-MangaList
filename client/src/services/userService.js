import axios from "axios";

const USER_ENDPOINT = {
	CREATE: "http://localhost:3001/user/create",
	LOGIN: "http://localhost:3001/user/login",
	INFO: "http://localhost:3001/user/info",
	LOGOUT: "http://localhost:3001/user/logout",
};

const logoutUser = async () => {
	const response = await axios({
		method: "POST",
		url: USER_ENDPOINT.LOGOUT,
		withCredentials: true,
	});
	return response;
};

const createUser = async (user) => {
	return await axios({
		url: USER_ENDPOINT.CREATE,
		method: "POST",
		data: user,
	});
};

const loginUser = async (dataToLogin) => {
	return await axios({
		url: USER_ENDPOINT.LOGIN,
		method: "POST",
		data: dataToLogin,
		withCredentials: true,
	});
};

const getUserInfo = async () => {
	try {
		const response = await axios({
			method: "GET",
			url: USER_ENDPOINT.INFO,
			withCredentials: true,
		});
		return response?.data?.user;
	} catch (err) {
		err["error"] = true;
		return err;
	}
};

export { createUser, loginUser, getUserInfo, logoutUser };
