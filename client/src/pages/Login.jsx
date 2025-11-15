import React from "react";
import "../css/Forms.css";
import { Link } from "react-router";
import { LoginSchema } from "../schemas/LoginSchema";

function Login() {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [errorMessage, setErrorMessage] = React.useState("");

	function submitLogin(e) {
		e.preventDefault();

		LoginSchema.validate({ email, password })
			.then(() => {
				// requisição para logar
			})
			.catch((err) => {
				setErrorMessage(err.message);
			});
	}

	return (
		<div className="form-body">
			<div className="form-container">
				<div className="input-section">
					<h1>Entrar em sua conta</h1>
					<form
						className="form"
						onSubmit={(e) => submitLogin(e)}
					>
						<label for="email">E-mail</label>
						<input
							id="email"
							type="email"
							onChange={(e) => setEmail(e.target.value)}
						></input>

						<label for="password">Senha</label>
						<input
							id="password"
							type="password"
							onChange={(e) => setPassword(e.target.value)}
						></input>

						<p className="forgot-password">
							Esqueceu a senha?{" "}
							<span
								className="forgot-password-click"
								onClick={() =>
									alert(
										"Entre em contato com o administrador!"
									)
								}
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
	);
}

export default Login;
