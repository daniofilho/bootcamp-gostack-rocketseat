# Testes React

Usando `create-react-app`, precisamos instalar uma lib que nos permitirá modificar algumas configurações do create-react-app

`yarn add react-app-rewired -D`

Feito isso, é necessário alterar os scripts no `package.json`

```json
"scripts": {
  "start": "react-app-rewired start",
  "build": "react-app-rewired build",
  "test": "react-app-rewired test",
  "coverage": "react-app-rewired test --coverage --watchAll=false",
  "eject": "react-scripts eject"
},
```

Após a instalação, é necessário criar um arquivo `config-overrides.js` na raiz do projeto para aplicar as configurações desejadas. Mesmo que não tenha as configurações ainda, é necessário criar um arquivo com export vazio:

```javascript
module.exports = {};
```

Também adicione uma nova lib de testes:

`yarn add @testing-library/react @testing-library/jest-dom @types/jest -D`

O testes criados precisam estar dentro da pasta `src` para que o `create-react-app` os encontre.

Agora é necessário adicionar instruções do jest ao `package.json`:

```json
"jest": {
  "testMatch": [
    "**/__tests__/**/*.test.js"
  ],
  "setupFilesAfterEnv": [
    "@testing-library/jest-dom/extend-expect"
  ],
  "moduleNameMapper": {
    "^~/(.*)": "<rootDir>/src/$1"
  },
  "collectCoverageFrom": [
    "!src/index.js"
  ],
  "coverageDirectory": "__tests__/coverage"
},
```

## Mocks

Toda vez que for necessário testar uma api terceira, como por exemplo o localStorage ou uma api via axios, é necessário criar um Mock. Isso acontece porque não é responsabilidade da aplicação realizar testes nessa API, então o Mock apenas simula o funcionamento correto da API especificada.

Em resumo nós só testamos se existe a comunicação e não se a comunicação funciona.

Algumas API já possuem Mocks prontos, como é o caso do localStorage

`yarn add jest-localstorage-mock -D`

Em seguida altere o `package.json` e acrescente a chamada ao mock:

```json
"jest": {
    "testMatch": [
      "**/__tests__/**/*.test.js"
    ],
    "setupFilesAfterEnv": [
      "@testing-library/jest-dom/extend-expect",
      "jest-localstorage-mock"
    ],
    "moduleNameMapper": {
      "^~/(.*)": "<rootDir>/src/$1"
    },
  },
```

### Criando um Mock novo

Dentro do seu arquivo de testes, você precisa especificar que todas as funções que vierem de uma determinada biblioteca passarão a ser um Mock:

`jest.mock("react-redux");`

Agora dentro da função de testes, você pode reescrever a função específica:

```javascript
useSelector.mockImplementation(cb =>
  cb({
    techs: ["Node.js", "ReactJS"]
  })
);
```

Isso fará com que toda vez que o teste encontre a função `useSelector` ele passe a rodar o código que você especificou. Dessa forma você testa o componente de forma isolada e não o funcionamento desse reducer especificamente.

Outras APIs precisam de algumas funções ou libs a mais para serem executadas dentro de um Mock. Os exemplos deste módulo incluem testes com `useSelector`, `useDispatch` e `axios`;
