const express = require("express");

const server = express();

// localhost:3000/teste

// # Query params = ?teste=1
/*server.get("/teste", (req, res) => {
  // requisição, resposta
  const name = req.query.name;
  return res.json({ name: name });
});*/

// # Route params = /users/1
/*
server.get("/users/:name", (req, res) => {
  const { name }  = req.params;
  return res.json({ name: name });
});*/

// # Request body => headers = { name: "dan" }
/*
const users = ["Dânio", "Bruna", "Camila"];

server.get("/users/:index", (req, res) => {
  const { index } = req.params;
  return res.json({ user: users[index] });
});*/

server.listen(3000);
