const express = require("express");
const app = express();
const port = 3001;

app.use(express.json()); // Permite receber dados no formato JSON nas requisições

app.get("/", (_req, res) => {
	res.send("Hello World!");
});

app.post("/user/create", (req, res) => {
	const { username, email, password } = req.body;

	res.status(200).send("OK");
});

app.listen(port, () => {
	console.log(`Server-side rodando na porta: ${port}`);
});
