import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";

import Header from "../components/Header";

import "../css/Forms.css";

import { RegisterSchema } from "../schemas/RegisterSchema";

function Register() {
	const navigate = useNavigate();
	const [username, setUsername] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [confirmPassword, setConfirmPassword] = React.useState("");
	const [errorMessage, setErrorMessage] = React.useState("");

	async function submitRegister(e) {
		e.preventDefault();

		const dataToRegister = { username, email, password, confirmPassword };

		try {
			await RegisterSchema.validate(dataToRegister);

			const response = await axios({
				url: "http://localhost:3001/user/create",
				method: "POST",
				data: dataToRegister,
			});

			if (response.status === 200) navigate("/login");
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
						<h1>Registrar sua conta</h1>
						<form
							className="form"
							onSubmit={(e) => submitRegister(e)}
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
								onChange={(e) =>
									setConfirmPassword(e.target.value)
								}
							></input>

							<button className="register-button">
								Registrar
							</button>

							<p className="error-message">{errorMessage}</p>
						</form>

						<Link id="return-to-login-page" to="/login">
							<img
								alt="icone retorno login"
								src="https://img.icons8.com/?size=100&id=3483&format=png&color=ad39e7"
							></img>
							Volta à página de login
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}

export default Register;
