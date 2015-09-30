import React from "react";
import ReactDOM from "react-dom";
import Relay from "react-relay";

import GraphQLRelay from "./components/GraphQLRelay";
import GraphQLRelayRoute from "./routes/GraphQLRelayRoute";

ReactDOM.render(
  <Relay.RootContainer Component={GraphQLRelay} route={new GraphQLRelayRoute()}/>, document.getElementById("app")
);
