#### Sucrase

Para poder usar `import blablabla from blablabla` ao invés de `const blabla = require('blablabla')`

Necessário executar o server como sucrase-node server.js ou configurar um middleware pro nodemon.

Basta criar um arquivo chamado nodemon.json na raiz com a seguinte configuração:

```
{
  "execMap": {
    "js": "sucrase-node"
  }
}
```

#### Docker

Instale o Docker e abra o terminal dele (ou apenas abra o terminal se estiver em unix nativo)

**Postgress**

Pesquise "docker postgres" no google.

Navegue até a pasta do projeto e rode o seguinte comando:

`docker run --name database -e POSTGRES_PASSWORD=docker -p 5433:5432 -d postgres`

obs: database é o nome do CONTAINER e não do BANCO, então será possível se referenciar a esse container usando o nome ao invés do seu ID

Digite `docker ps`para verificar se os container ativos e ver se o bando atual foi criado.

**Postbird**

https://electronjs.org/apps/postbird

Interface visual para se conectar ao banco ativo.

Atenção: no Docker Toolbox (legacy), localhost vai ser sempre => 192.168.99.100 (ou o IP que for definido ao inicializar o Docker)

#### Sequelize

é um ORM

- abstrai a forma como interagimos com um banco de dados.
- tabelas viram models

**migrations**

-- escrever melhor a definição
