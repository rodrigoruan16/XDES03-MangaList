const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: `${__dirname}/.env` }); // Permite acesso ao .env

const app = express();

const PORT = process.env.PORT || 5000;
const CLIENT_PORT = process.env.CLIENT_PORT || 5001;

const UserController = require("./controllers/userController");
const MangaController = require("./controllers/mangaController");
const { AuthMiddleware } = require("./middlewares/authMiddleware");
const { errorHandler } = require("./middlewares/errorHandler");

app.use(express.json()); // Permite receber dados no formato JSON nas requisições
app.use(cookieParser()); // Permite ler token
app.use(
	cors({
		origin: `http://localhost:${CLIENT_PORT}`,
		credentials: true,
	})
); // Permite requisições do client-side

// Rotas de usuário
app.post("/user/create", UserController.create);
app.post("/user/login", UserController.login);
app.post("/user/logout", UserController.logout);
app.get("/user/info", AuthMiddleware, UserController.getInfo);

// Rotas de manga
// 1º Favoritos
app.get("/manga/favorite", AuthMiddleware, MangaController.getFavorites);
app.post("/manga/favorite", AuthMiddleware, MangaController.setFavorite);
app.delete("/manga/favorite", AuthMiddleware, MangaController.removeFavorite);
// 2º Comentários
app.post("/manga/comment", AuthMiddleware, MangaController.addComment);
app.delete("/manga/comment", AuthMiddleware, MangaController.removeComment);
app.put("/manga/comment", AuthMiddleware, MangaController.editComment);

// Verificação se o servidor está no ar
app.get("/", (_req, res) => res.send("Hello World!"));
app.listen(PORT, () => console.log(`Server-side rodando na porta: ${PORT}`));

app.use(errorHandler); // Para tratamento de erros global
