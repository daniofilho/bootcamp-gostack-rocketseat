const express = require("express");

const server = express();
server.use(express.json()); // Avisa o express que vamos receber sempre JSON

const users = ["Dânio", "Bruna", "Camila"];

// # Middleware Global

// chamado independente da rota solicitada. Usado para manipular informações
server.use((req, res, next) => {
  // next, próximo middleware = avança

  console.time("request"); // cronometrar o tempo de execução

  console.log(`\nMétodo ${req.method}; URL: ${req.url};`);
  //return next(); // permite que o código continue sendo executado
  next();

  console.timeEnd("request");
});

// # Middleware local

// Verifica se nome de usuário existe antes de seguir.
function checkUserExists(req, res, next) {
  const user = req.body.name;
  if (!user) {
    return res.status(400).json({ error: "User name is required!" });
  }
  req.user = user; // alterando a variável req para passar para as próximas funções da sequência
  return next();
}

// Verifica se index existe
function checkUserInArray(req, res, next) {
  if (!users[req.params.index]) {
    return res.status(400).json({ error: "User does not exist!" });
  }
  return next();
}

// #CRUD

// C => Create
// inserindo um middlware antes
server.post("/users", checkUserExists, (req, res) => {
  users.push(req.user); // parâmetro adicionado pelo middleware
  return res.json(users);
});

// R => Read
server.get("/users", checkUserInArray, (req, res) => {
  return res.json(users);
});

server.get("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;
  return res.json({ user: users[index] });
});

// U => Update
server.put("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;
  users[index] = name;
  return res.json(users);
});

// D => Delete
server.delete("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;
  users.splice(index, 1); //remove item do vetor X posições a partir do index
  return res.send();
});

// - - - - - - - - - - - - - //

server.listen(3000);
