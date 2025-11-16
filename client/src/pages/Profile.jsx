import React from "react";

import "../css/Profile.css";
import Header from "../components/Header";

function Profile() {
	const [userId, setUserId] = React.useState(null);
	const [userAvatar, setUserAvatar] = React.useState(null);
	const [userName, setUserName] = React.useState(null);

	React.useEffect(() => {
		const { id, avatar_url, username } = JSON.parse(
			sessionStorage.getItem("user_info")
		);
		setUserId(id);
		setUserAvatar(avatar_url);
		setUserName(username);
	}, []);

	function deslogar() {}

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

						<button className="logout-button">Sair</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default Profile;
