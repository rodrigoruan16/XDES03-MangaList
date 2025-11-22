import React from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router";
import "../css/Profile.css";
import { getUserInfo, logoutUser } from "../services/userService";

function Profile() {
	const navigate = useNavigate();
	const [user, setUser] = React.useState({});
	const [errorMessage, setErrorMessage] = React.useState(null);

	async function deslogar() {
		try {
			const response = await logoutUser();

			if (response.status === 200) {
				sessionStorage.clear();
				navigate("/");
			}
		} catch (err) {
			setErrorMessage(err.message);
		}
	}

	React.useEffect(() => {
		if (!sessionStorage.getItem("user_logged")) return navigate("/login");

		getUserInfo().then((data) => {
			if (data["error"]) return deslogar();
			setUser(data);
		});
	}, []);

	const InfoRow = ({ label, value }) => {
		return (
			<div>
				<p>{label}</p>
				<p className="info">{value}</p>
			</div>
		);
	};

	return (
		<>
			<Header />
			<div className="profile-body">
				<div className="profile-container">
					<div className="pfp-container">
						<img className="profile-picture" src={user.avatar_url} />
					</div>
					<div className="pf-info-container">
						<InfoRow label="ID:" value={user.id} />
						<InfoRow label="Nome de usuário:" value={user.username} />
						<InfoRow label="E-mail:" value={user.email} />
						<InfoRow label="Conta criada em:" value={new Date(user.created_at).toLocaleString()} />
						<InfoRow label="Conta atualizada em:" value={new Date(user.updated_at).toLocaleString()} />
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
