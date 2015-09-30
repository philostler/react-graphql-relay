import WebpackDevServer from "webpack-dev-server";
import WebpackCompiler from "./webpack-compiler";

let client = new WebpackDevServer(WebpackCompiler, {
  contentBase: "client/public",
  historyApiFallback: true,
  hot: true,
  proxy: {
    "/graphql": "http://localhost:5000/graphql"
  },
  stats: {
    colors: true
  }
})

client.listen(5001, () => console.log(
  "Example 04 - GraphQL & Relay Client Started on 5001"
));
