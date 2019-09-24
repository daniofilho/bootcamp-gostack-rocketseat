#### React

Para que o React rode, é necessário instalar Babel e Webpack

`yarn add @babel/core @babel/preset-env @babel/preset-react webpack webpack-cli babel-loader @babel/plugin-proposal-class-properties -D`

Em seguida, instale o React

`yarn add react react-dom`

#### Configurando o Babel

crie um arquivo chamado babe.config.js na raiz do projeto:

```
module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: ["@babel/plugin-proposal-class-properties"]
};
```

#### Configurando Webpack

Crie um arquivo chamado webpack.config.js na raiz do projeto:

```
const path = require("path");

module.exports = {
  // ponto de entrada da aplicação
  entry: path.resolve(__dirname, "src", "index.js"),
  // resultado compilado da aplicação
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/, // transpira os arquivos js da aplicação
        exclude: /node_modules/, // mas evita os que estão em node_modules
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};

```

Crie uma pasta chamada src na raiz do projeto e um arquivo chamado index.js com a seguinte estrutura:

#### Bundle

Adicione o seguinte código ao package.json

```
"scripts":{
    "build": "webpack --mode production"
  },
```

Em seguida rode o comando `yarn build` para criar um primeiro bundle do projeto

#### index.html

Dentro da pasta `public` que foi criada no comando anterior, crie um arquivo chamado index.html. Pode ter qualquer coisa dentro desse arquivo, mas o principal é que ele tenha o seguinte script:

```
<script src="./bundle.js"></script>
```

#### live reload

Instale

`yarn add webpack-dev-server -d`

dentro de webpack.config.js, crie a seguinte linha antes de module:

```
devServer: {
  contentBase: path.resolve(__dirname, 'public')
}
```

Agora crie um novo script dentro do package.json:

```
"dev": "webpack-dev-server --mode production
```

**React pronto para começar a ser usado!**

#### Adicionando loaders de CSS

`yarn add style-loader css-loader -D`

Dentro de module, adicione os parâmetros para utilizar essas libs:

```
module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      }
    ]
  }
```

#### Adicionando loader de imagem

`yarn add file-loader -D`
