import * as yup from "yup";

const ProfileSchema = yup.object({
	avatar_url: yup
		.string()
		.matches(
			/^https?:\/\/.+\.(png|jpg|jpeg|gif|webp|svg)([?#].*)?$/i,
			"O link da imagem deve começar com http(s) e finalizar com o formato da imagem [.jpeg, .png, .jpg, etc]."
		)
		.required("Por favor, insira a URL da imagem de perfil."),
	username: yup
		.string()
		.min(3, "O nome de usuário deve ter no mínimo 3 caracteres.")
		.required(),
	email: yup.string().email().required("Por favor, digite o seu email."),
});

export { ProfileSchema };
