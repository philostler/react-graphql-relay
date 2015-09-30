import Path from "path";
import Webpack from "webpack";

const rootDir = Path.resolve(__dirname);

export default Webpack({
  context: rootDir,
  entry: [
    "webpack-dev-server/client?http://0.0.0.0:5001",
    "webpack/hot/only-dev-server",
    "./main"
  ],
  output: {
    path: rootDir + "/build",
    filename: "graphql-relay.js"
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          stage: 0,
          plugins: ["./client/babelRelayPlugin"]
        }
      }
    ]
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NoErrorsPlugin()
  ],
  devtool: "cheap-module-eval-source-map"
});
