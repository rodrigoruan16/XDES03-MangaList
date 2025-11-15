const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: `${__dirname}/.env` }); // Permite acesso ao .env

const app = express();

const PORT = process.env.PORT || 5000;

const UserController = require("./controllers/userController");

app.use(express.json()); // Permite receber dados no formato JSON nas requisições
app.use(cors()); // Permite requisições do client-side

// Verificação se o servidor está no ar
app.get("/", (_req, res) => {
	res.send("Hello World!");
});

app.listen(PORT, () => {
	console.log(`Server-side rodando na porta: ${PORT}`);
});

// Rotas de usuário
app.post("/user/create", UserController.create);
app.post("/user/login", UserController.login);
