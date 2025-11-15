const express = require("express");
const cors = require("cors");

const app = express();
const port = 3001;

const UserController = require("./controllers/userController");

app.use(express.json()); // Permite receber dados no formato JSON nas requisições
app.use(cors()); // Permite requisições do client-side

// Verificação se o servidor está no ar
app.get("/", (_req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Server-side rodando na porta: ${port}`);
});

// Rotas de usuário
app.post("/user/create", UserController.create);
app.post("/user/login", UserController.login);
