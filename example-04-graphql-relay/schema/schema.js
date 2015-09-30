import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from "graphql/type";
import { globalIdField } from "graphql-relay";

import { FestivalDB, StageDB } from "../server/database";

const splitTags = festival => {
  festival.tags = festival.tags.split(",");
  return festival;
}

const Stage = new GraphQLObjectType({
  name: "Stage",
  fields: {
    id: globalIdField("Stage"),
    name: { type: GraphQLString }
  }
});

const Festival = new GraphQLObjectType({
  name: "Festival",
  fields: {
    id: globalIdField("Festival"),
    name: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    stages: { type: new GraphQLList(Stage) }
  }
});

const Event = new GraphQLObjectType({
  name: "Event",
  fields: {
    festival: {
      type: Festival,
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (root, {id}) => FestivalDB.findById(id, {
        include: [{
            model: StageDB
        }]
      }).then(splitTags)
    },
    festivals: {
      type: new GraphQLList(Festival),
      args: {
        limit: { type: GraphQLInt }
      },
      resolve: (root, {limit}) => FestivalDB.findAll({
        limit: limit,
        include: [{
            model: StageDB
        }]
      }).then(festivals => festivals.map(splitTags))
    }
  }
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    event: {
      type: Event,
      resolve: () => ({})
    }
  }
})

const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    updateFestival: {
      type: Festival,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        tags: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (root, {id, name, tags}) => FestivalDB.findById(id).then(festival => {
        return festival.updateAttributes({
          name: name,
          tags: tags
        });
      }).then(splitTags)
    }
  }
})

export default new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});
