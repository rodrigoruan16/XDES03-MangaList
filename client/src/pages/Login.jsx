import React from "react";
import axios from "axios";

import Header from "../components/Header";

import "../css/Forms.css";

import { Link, useNavigate } from "react-router";
import { LoginSchema } from "../schemas/LoginSchema";

function Login() {
	const navigate = useNavigate();
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [errorMessage, setErrorMessage] = React.useState("");

	async function submitLogin(e) {
		e.preventDefault();

		const dataToLogin = { email, password };

		try {
			await LoginSchema.validate(dataToLogin);

			const response = await axios({
				url: "http://localhost:3001/user/login",
				method: "POST",
				data: dataToLogin,
				withCredentials: true,
			});

			if (response.status === 200) {
				const user_info = JSON.stringify(response.data.user);
				sessionStorage.setItem("user_logged", true);
				sessionStorage.setItem("user_info", user_info);
				navigate("/favorites");
			}
		} catch (err) {
			const serverErrorMessage = err?.response?.data?.error;
			setErrorMessage(serverErrorMessage || err.message);
		}
	}

	return (
		<>
			<Header />
			<div className="form-body">
				<div className="form-container">
					<div className="input-section">
						<h1>Entrar em sua conta</h1>

						<form className="form" onSubmit={(e) => submitLogin(e)}>
							<label htmlFor="email">E-mail</label>
							<input id="email" type="email" onChange={(e) => setEmail(e.target.value)}></input>

							<label htmlFor="password">Senha</label>
							<input id="password" type="password" onChange={(e) => setPassword(e.target.value)}></input>

							<p className="forgot-password">
								Esqueceu a senha?{" "}
								<span
									className="forgot-password-click"
									onClick={() => alert("Entre em contato com o administrador!")}
								>
									Clique aqui
								</span>
							</p>

							<button className="login-button">Entrar</button>

							<p className="error-message">{errorMessage}</p>
						</form>
					</div>
					<div className="section-registrar">
						<span>Novo usuário? </span>
						<Link className="register-link" to="/register">
							Registrar
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}

export default Login;
