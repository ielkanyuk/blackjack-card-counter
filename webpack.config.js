const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.dirname(__dirname, "dist")
  },
  devServer: {
    port: 4203
  },
  plugins: [
    new HTMLPlugin({
      template: "./src/index.html"
    })
  ],
  module: {
    rules: [
      {
        test: /\.(eot|ttf|woff|woff2|svg|png)$/i,
        use: 'file-loader'
      }
    ]
  }
}