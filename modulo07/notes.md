#### Redux

**Actions**

Funções que disparam certas ações. Adicionar algo, remover algo, etc...

**Reducers**

Funções que "ouvem" os actions e manipulam as informações enviadas pelas Actions.

É como se as Actions fossem o front end disparando algum evento ajax e os Reducers sendo a API.

#### JSON Server

https://github.com/typicode/json-server

API Fake para testes.

instalação:

`sudo npm install -g json-server`;

Crie um arquivo chamado `server.json` e cole um JSON válido lá dentro.

Para rodar o "server":

`json-server server.json -p 3333 -w`

#### Reactotron com Redux

`yarn add reactotron-react-js reactotron-redux`

#### Immer

https://github.com/immerjs/immer

Manipulação de estados imutáveis.

#### Redux Saga

Middleware do Redux para interceptar dispatches

`yarn add redux-saga`

**Plugin do Reactotron para ter mais informações sobre redux saga**

`yarn add reactotron-redux-saga`
