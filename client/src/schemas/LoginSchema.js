import * as yup from "yup";

const LoginSchema = yup.object({
	email: yup.string().email().required("Por favor, digite o seu email."),
	password: yup
		.string()
		.min(4, "A senha deve conter pelo menos 4 dígitos")
		.required("Por favor, digite a sua senha."),
});

export { LoginSchema };
