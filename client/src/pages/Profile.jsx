import React from "react";
import axios from "axios";

import "../css/Profile.css";
import Header from "../components/Header";
import { useNavigate } from "react-router";

function Profile() {
	const navigate = useNavigate();
	const [user, setUser] = React.useState({});
	const [errorMessage, setErrorMessage] = React.useState("");
	const [avatarUrl, setAvatarUrl] = React.useState("");
	const [userName, setUserName] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [editMode, setEditMode] = React.useState(false);

	React.useEffect(() => {
		if (!sessionStorage.getItem("user_logged")) {
			return navigate("/login");
		}

		axios({
			method: "GET",
			url: "http://localhost:3001/user/info",
			withCredentials: true,
		})
			.then(({ data }) => {
				setUser(data.user);
				setAvatarUrl(data.user.avatar_url);
				setUserName(data.user.username);
				setEmail(data.user.email);
			})
			.catch((_err) => {
				return navigate("/login");
			});
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

	async function atualizarPerfil() {
		setEditMode(false);
	}

	return (
		<>
			<Header />
			<div className="profile-body">
				<div className="profile-container">
					<div className="pfp-container">
						<img src={user.avatar_url} />
						<input
							className="pfp-edit-input"
							disabled={!editMode}
							onChange={(e) => setAvatarUrl(e.target.value)}
							defaultValue={user.avatar_url}
						/>
					</div>

					<div className="pfp-info-container">
						<div>
							<p>ID: </p>
							<p className="info">{user.id}</p>
						</div>

						<div>
							<p>Nome de usuário: </p>
							<input
								className="pfp-edit-input"
								onChange={(e) => setUserName(e.target.value)}
								defaultValue={user.username}
								disabled={!editMode}
							/>
						</div>

						<div>
							<p>E-mail:</p>
							<input
								onChange={(e) => setEmail(e.target.value)}
								className="pfp-edit-input"
								defaultValue={user.email}
								disabled={!editMode}
							/>
						</div>

						<div>
							<p>Conta criada em: </p>
							<p className="info">
								{new Date(user.created_at).toLocaleString()}
							</p>
						</div>

						<div>
							<p>Conta atualizada em: </p>
							<p className="info">
								{new Date(user.updated_at).toLocaleString()}
							</p>
						</div>

						<p className="error-message">{errorMessage}</p>
						<div id="buttons-container">
							<button
								onClick={deslogar}
								className="logout-button"
							>
								Sair
							</button>
							<button
								onClick={() => {
									editMode
										? atualizarPerfil()
										: setEditMode(true);
								}}
								className="edit-button"
							>
								{editMode ? "Salvar" : "Editar"}
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Profile;
