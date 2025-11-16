import React from "react";
import axios from "axios";

import "../css/Profile.css";
import Header from "../components/Header";
import { useNavigate } from "react-router";

function Profile() {
	const navigate = useNavigate();
	const [userId, setUserId] = React.useState(null);
	const [userAvatar, setUserAvatar] = React.useState(null);
	const [userName, setUserName] = React.useState(null);
	const [errorMessage, setErrorMessage] = React.useState("");

	React.useEffect(() => {
		if (!sessionStorage.getItem("user_logged")) {
			return navigate("/login");
		}

		axios({
			method: "GET",
			url: "http://localhost:3001/user/info",
			withCredentials: true,
		})
			.then((data) => {
				console.log(data);
			})
			.catch((err) => {
				setErrorMessage(err.message);
			});

		const { id, avatar_url, username } = JSON.parse(
			sessionStorage.getItem("user_info")
		);
		setUserId(id);
		setUserAvatar(avatar_url);
		setUserName(username);
	}, []);

	async function deslogar() {
		try {
			const response = await axios({
				method: "POST",
				url: "http://localhost:3001/user/logout",
			});

			if (response.status === 200) {
				sessionStorage.clear();
				navigate("/");
			}
		} catch (err) {
			setErrorMessage(err.message);
		}
	}

	return (
		<>
			<Header />
			<div className="profile-body">
				<div className="profile-container">
					<div className="pfp-container">
						<img src={userAvatar} />
						<div>
							<input
								onChange={(e) => setUserAvatar(e.target.value)}
								defaultValue={userAvatar}
							/>
						</div>
					</div>

					<div>
						<section>
							<p>ID do usuário</p>
							<p>{userId}</p>
						</section>

						<p>Nome de usuário: {userName}</p>

						<p className="error-message">{errorMessage}</p>

						<button onClick={deslogar} className="logout-button">
							Sair
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default Profile;
