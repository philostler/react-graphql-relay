import express from "express";
import expressGraphQL from "express-graphql";

import Schema from "../schema/schema";

// Server
let server = express();

server.use("/graphql", [
  expressGraphQL({
    schema: Schema,
    pretty: true
  })
]);

server.listen(5000, () => console.log(
  "Example 04 - GraphQL & Relay Server Started in 5000"
));
