import * as yup from "yup";

const RegisterSchema = yup.object({
	username: yup.string().required("Por favor, digite seu nome de usuário."),
	email: yup.string().email().required("Por favor, digite o seu email."),
	password: yup
		.string()
		.min(4, "A senha deve conter pelo menos 4 dígitos")
		.required("Por favor, digite a sua senha."),
	confirmPassword: yup
		.string()
		.oneOf(
			[yup.ref("password")],
			"A senha de confirmação deve ser igual a senha."
		)
		.required("A senha de confirmação não deve ser vazia."),
});

export { RegisterSchema };
