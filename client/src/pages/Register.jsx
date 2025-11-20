import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { RegisterSchema } from "../schemas/RegisterSchema";
import Header from "../components/Header";
import FormInput from "../components/FormInput";
import "../css/Forms.css";

function Register() {
	const navigate = useNavigate();
	const [user, setUser] = React.useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [errorMessage, setErrorMessage] = React.useState("");

	async function submitRegister(e) {
		e.preventDefault();

		try {
			await RegisterSchema.validate(user);

			const response = await axios({
				url: "http://localhost:3001/user/create",
				method: "POST",
				data: user,
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

						<form className="form" onSubmit={(e) => submitRegister(e)}>
							<FormInput
								setUser={setUser}
								user={user}
								type="text"
								label="Nome de usuário "
								id="username"
							/>
							<FormInput user={user} setUser={setUser} type="email" label="E-mail " id="email" />
							<FormInput setUser={setUser} user={user} type="password" label="Senha " id="password" />
							<FormInput
								setUser={setUser}
								user={user}
								type="password"
								label="Confirmar senha "
								id="confirmPassword"
							/>

							<button className="register-button">Registrar</button>

							<p className="error-message">{errorMessage}</p>
						</form>

						<Link id="return-to-login-page" to="/login">
							Volta à página de login
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}

export default Register;
