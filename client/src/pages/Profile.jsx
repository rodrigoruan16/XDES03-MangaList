import React from "react";
import axios from "axios";

import "../css/Profile.css";
import Header from "../components/Header";
import { useNavigate } from "react-router";

import { ProfileSchema } from "../schemas/ProfileSchema";

function Profile() {
	const navigate = useNavigate();
	const [user, setUser] = React.useState({});
	const [errorMessage, setErrorMessage] = React.useState(null);
	const [avatarUrl, setAvatarUrl] = React.useState(null);
	const [userName, setUserName] = React.useState(null);
	const [email, setEmail] = React.useState(null);
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
		try {
			const dataToPatch = {
				avatar_url: avatarUrl,
				username: userName,
				email,
			};

			await ProfileSchema.validate(dataToPatch);

			const response = await axios({
				url: "http://localhost:3001/user/edit",
				method: "patch",
				data: dataToPatch,
				withCredentials: true,
			});

			if (response.status === 200) {
				const {
					id,
					avatar_url,
					email,
					username,
					updated_at,
					created_at,
				} = response.data;

				sessionStorage.setItem(
					"user_info",
					JSON.stringify({ avatar_url, id, username })
				);

				setAvatarUrl(avatar_url);
				setUserName(username);
				setEmail(email);
				setUser({ ...user, updated_at, created_at });
				setErrorMessage("Perfil editado com sucesso.");
			}
		} catch (err) {
			const serverErrorMessage = err?.response?.data?.error;
			setErrorMessage(serverErrorMessage || err.message);
		}

		setEditMode(false);
	}

	return (
		<>
			<Header />
			<div className="profile-body">
				<div className="profile-container">
					<img
						className="edit-icon"
						src={
							editMode
								? "https://img.icons8.com/?size=100&id=152&format=png&color=ffffff"
								: "https://img.icons8.com/?size=100&id=94&format=png&color=ff0000"
						}
					/>
					<div className="pfp-container">
						<img className="profile-picture" src={avatarUrl} />
						<input
							disabled={!editMode}
							onChange={(e) => setAvatarUrl(e.target.value)}
							defaultValue={avatarUrl}
						/>
					</div>

					<div className="pf-info-container">
						<div>
							<p>ID: </p>
							<p className="info">{user.id}</p>
						</div>

						<div>
							<p>Nome de usuário: </p>
							<input
								onChange={(e) => setUserName(e.target.value)}
								defaultValue={userName}
								disabled={!editMode}
							/>
						</div>

						<div>
							<p>E-mail:</p>
							<input
								onChange={(e) => setEmail(e.target.value)}
								defaultValue={email}
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
