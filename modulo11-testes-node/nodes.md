## Tipos de Testes

### Testes unitários

Testam funções mínimas e puras, ou seja, funções isoladas que não afetam acesso a banco ou integrações externas

### Testes de integração

Testam funcionalidades completas, não apenas uma função específica, podem passar por vários arquivos.

### Testes E2E - end to end

Testes que simulam o comportamento de um usuário ao acessar a página.

## TDD - Test Driven Development

Princípio de desenvolvimento, criar testes antes de desenvolver a funcionalidade. Isso facilita na visualização das regras de negócio.

Fluxo:

RED => GREEN => REFACTOR

Falha => Faz passar, independente do jeito => Refatora o código escrito para deixar passando, mas da melhor maneira possível

### Code Coverage

O que testar? Testei o suficiente? Falta algo?

Code Coverage mostra as linhas de códigos que nenhum teste chegou, isso faz com que você descubra onde não foi testado e permite que você crie testes para chegar a essas linhas e garantir que o código todo seja testado

**Jest**

Framework de testes, desenvolvido pelo Facebook.

Server Back End, Front End, Mobile.

Code coverage integrado.

`yarn add jest -D`

`yarn add @sucrase/jest-plugin -D` => Plugin do Sucrase para integrar com o Jest

`yarn jest --init` => Iniciar projeto

- ... package.json? **yes**
- ...inviroment? **node** ou **browser**
- ... coverage reports? **yes** => aqui onde ele gera os relatórios de code coverage
- auto ... between every test? y => limpa a memória entre os testes

Ele irá criar um arquivo jest.config.js. Altere-o e o deixe assim

```javascript
module.exports = {
  // Stop running tests after `n` failures
  bail: 1,

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ['src/app/**/*.js'],

  // The directory where Jest should output its coverage files
  coverageDirectory: '__tests__/coverage',

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: [
    //   "json",
    'text',
    'lcov',
    //   "clover"
  ],

  // The test environment that will be used for testing
  testEnvironment: 'node',

  // The glob patterns Jest uses to detect test files
  testMatch: ['**/__tests__/**/*.test.js'],

  // A map from regular expressions to paths to transformers
  transform: {
    '.(js|jsx|ts|tsx)': '@sucrase/jest-plugin',
  },
};
```

Em seguida ajuste o arquivo `nodemon.json` para evitar que o nodemon resete a cada alteração no teste

```javascript
{
  "execMap": {
    "js": "sucrase-node"
  },
  "ignore": [
    "__tests__"
  ]
}
```

Agora crie uma pasta chamada `__tests__` e todo arquivo criado lá dentro precisa terminar com `*.test.js`

Um detalhe é que dentro dos arquivos de teste não irá ter sintax highlight, então é necessário instalar:

`yarn add -D @types/jest`

Sintaxe de exemplo

```javascript
test('@desc', () => {
  // @result = @func

  expect(@result).toBe(@toBe)
});
```

**@desc** => Descrição completa do que o teste faz, geralmente escrito em inglês
**@func** => A função que será testada, então escreve o código para testar a função mesmo
**@result** => O retorno da função informada
**@toBe** => O resultado que esperamos receber ao testar essa função

Exemplo:

```javascript
function soma(a, b) {
  return a + b;
}

test('if I call soma function with 4 and 5 it should return 9', () => {
  const result = soma(4, 5);

  expect(result);
});
```

Agora para executar os arquivos de teste, rode:

`yarn test`

### .env para testes

Não é interessante manter o arquivo `.env` normal para testar, já que novos dados serão criados, deletados, etc... então é bom criar um arquivo `.env.test` apenas para rodar os testes.

Ao criar esse arquivo, é necessário avisar a aplicação que está executando em ambiente de testes. Para isso crie um arquivo na pasta `src` chamado `bootstrap.js` com o seguinte conteúdo:

```javascript
import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});
```

Em seguida, em todos os locais onde existia o `import 'dotenv/config`, altere para importar esse arquivo recém criado.

Depois disso, abra o `package.json` e altere a instrução de `test` para:

```json
"pretest": "NODE_ENV=test sequelize db:migrate",
"test": "NODE_ENV=test jest",
"posttest": "NODE_ENV=test sequelize db:migrate:undo:all"
```

**obs: para Windows o comando acima é ligeramente diferente:**

```json
"pretest": "set NODE_ENV=test sequelize db:migrate",
"test": "set NODE_ENV=test jest",
"posttest": "set NODE_ENV=test sequelize db:migrate:undo:all"
```
