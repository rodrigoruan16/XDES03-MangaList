const yup = require("yup");

const FavoriteSchema = yup.object({
	manga_id: yup.string().required("Necessário o ID do mangá."),
});

const AddCommentSchema = yup.object({
	manga_id: yup.string().required("Necessário o ID do mangá."),
	comment: yup.string().required("Por favor, adicione o comentário."),
});

const RemoveCommentSchema = yup.object({
	comment_id: yup.string().required("Necessário o ID do comentário."),
});

const EditCommentSchema = yup.object({
	comment_id: yup.string().required("Necessário o ID do comentário."),
	comment: yup.string().required("Por favor, adicione o comentário."),
});

module.exports = { FavoriteSchema, AddCommentSchema, RemoveCommentSchema, EditCommentSchema };
