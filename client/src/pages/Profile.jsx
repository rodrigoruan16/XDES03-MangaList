import React from "react";
import axios from "axios";
import Header from "../components/Header";
import { useNavigate } from "react-router";
import "../css/Profile.css";

function Profile() {
	const navigate = useNavigate();
	const [user, setUser] = React.useState({});
	const [errorMessage, setErrorMessage] = React.useState(null);

	React.useEffect(() => {
		if (!sessionStorage.getItem("user_logged")) {
			return navigate("/login");
		}

		axios({
			method: "GET",
			url: "http://localhost:3001/user/info",
			withCredentials: true,
		})
			.then(({ data }) => setUser(data.user))
			.catch((_err) => navigate("/login"));
	}, []);

	async function deslogar() {
		try {
			const response = await axios({
				method: "POST",
				url: "http://localhost:3001/user/logout",
				withCredentials: true,
			});

			if (response.status === 200) {
				sessionStorage.clear();
				navigate("/");
			}
		} catch (err) {
			setErrorMessage(err.message);
		}
	}

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
