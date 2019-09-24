const path = require("path");

module.exports = {
  // ponto de entrada da aplicação
  entry: path.resolve(__dirname, "src", "index.js"),
  // resultado compilado da aplicação
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.resolve(__dirname, "public")
  },
  module: {
    rules: [
      {
        test: /\.js$/, // transpira os arquivos js da aplicação
        exclude: /node_modules/, // mas evita os que estão em node_modules
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      },
      {
        test: /.*\.(gif|png|jpe?g)$/i,
        use: [
          {
            loader: "file-loader"
          }
        ]
      }
    ]
  }
};
