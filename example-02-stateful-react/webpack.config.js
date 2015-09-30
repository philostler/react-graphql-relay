var path = require("path")

module.exports = {
  entry: "./app/index",
  output: {
    path: path.join(process.cwd(), "build"),
    filename: "app.js"
  },
  module: {
    loaders: [
      { test: /\.js$|\.jsx$/, exclude: /node_modules/, loaders: ["babel"] }
    ]
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  }
}
