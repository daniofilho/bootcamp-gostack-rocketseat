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

Caso precise parar o container: `docker stop CONTAINER_ID`;

Caso precise remover o container: `docker rm CONTAINER_ID`;

Caso precise iniciar o container: `docker start CONTAINER_ID`;

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

#### MVC

Controlers sempre tem 5 métodos:

index() => Listagem de dados

show() => Exibir um único dado

store() => Cadastrar um dado

update () => Alterar um dado

delete() => Remover um dado

#### Padrão de código

Adicionar ESLINT ao projeto para padronizar forma de escrita

`yarn add eslint -D`

Agora precisamos criar um arquivo de configurações:

`yarn eslint --init`

Selecione as seguintes opções:

- To check syntax, find problems, and enforce code style
- JavaScript modules (import/export)
- Escolha de acordo com o Framework usado, ou nenhum
- Se for projeto Node, use NODE, caso contrário Browser
- Use a popular style guide
- Airbnb
- Javascript
- Permite a instalação das dependências

Ele vai criar um package.json.lock. Exclua e rode `yarn` para atualizar as dependências dentro do yarn.

Em seguida vai ser criado um arquivo de configuração, deixe ele assim:

```
module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ["airbnb-base", "prettier"],
  plugins: ["prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    "prettier/prettier": "error",
    "class-methods-use-this": "off",
    "no-param-reassign": "off",
    camelcase: "off",
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }]
  }
};

```

Em seguida, configure o VS Code instalando as extensões ESLint e Prettier e deixe as configurações do VS Code com base nessa:

https://gist.github.com/daniofilho/e6460e83ce511748ad1cf57e6bdd4bf3

Agora adicione o Prettier ao projeto

`yarn add prettier eslint-config-prettier eslint-plugin-prettier -D`

Como o Prettier conflita algumas regras com as regras do Airbnb, será necessário criar um novo arquivo chamado `.prettierrc` e sobrescrever algumas configurações:

```
{
  "singleQuote": true,
  "trailingComma": "es5"
}
```

Também é possível forçar que o eslint corrija todos os arquivos de uma vez só:

`yarn eslint --fix src --ext .js`

**Editor Config**

Vamos garantir que todos no projeto usem as mesmas configurações do editor.

Instale um plugin no VS Code chamado Editor Config.

Crie um arquivo na raiz do projeto chamado .editorconfig e deixe com as seguintes configurações:

```
root = true

[*]
indent_style = space
indent_size = 2
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

#### Sequelize

Após configurado o Sequelize, precisamos criar as migrations / tabelas

`yarn sequelize migration:create --name=NOME_DA_MIGRATION`

Após criar os arquivos de migrations, é preciso executar para criar as tabelas:

`yarn sequelize db:migrate`

Desfazer a última migration:

`yarn sequelize db:migrate:undo`

Desfazer todas as migrations:

`yarn sequelize db:migrate:undo:all`

#### Tokens

Tokens JWT, após serem gerados, são sempre enviados pelo Header da request no seguinte formato

`Bearer TOKEN_AQUI`
