import React from "react";
import "../css/Register.css";
import { Link } from "react-router";
import { RegisterSchema } from "../schemas/RegisterSchema";

function Register() {
	const [username, setUsername] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [confirmPassword, setConfirmPassword] = React.useState("");
	const [errorMessage, setErrorMessage] = React.useState("");

	function submitLogin(e) {
		e.preventDefault();

		RegisterSchema.validate({ username, email, password, confirmPassword })
			.then(() => {})
			.catch((err) => {
				setErrorMessage(err.message);
			});
	}

	return (
		<div className="login-body">
			<div className="login-container">
				<div className="input-section">
					<h1>Entrar em sua conta</h1>
					<form
						className="login-form"
						onSubmit={(e) => submitLogin(e)}
					>
						<label for="username">
							Nome de usuário{" "}
							<span className="required-field">*</span>
						</label>
						<input
							id="username"
							type="text"
							onChange={(e) => setUsername(e.target.value)}
						></input>

						<label for="email">
							E-mail <span className="required-field">*</span>
						</label>
						<input
							id="email"
							type="email"
							onChange={(e) => setEmail(e.target.value)}
						></input>

						<label for="password">
							Senha <span className="required-field">*</span>
						</label>
						<input
							id="password"
							type="password"
							onChange={(e) => setPassword(e.target.value)}
						></input>

						<label for="confirmPassword">
							Confirmar senha{" "}
							<span className="required-field">*</span>
						</label>
						<input
							id="confirmPassword"
							type="password"
							onChange={(e) => setConfirmPassword(e.target.value)}
						></input>

						<button className="register-button">Registrar</button>

						<p className="error-message">{errorMessage}</p>
					</form>

					<Link id="return-to-login-page" to="/login">
						<img src="https://img.icons8.com/?size=100&id=3483&format=png&color=ad39e7"></img>
						Volta à página de login
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Register;
