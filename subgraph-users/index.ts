import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { readFileSync } from "fs";
import gql from "graphql-tag";
import { users } from "./data";

const typeDefs = gql(readFileSync("./schema.graphql", { encoding: "utf-8" }));

const resolvers = {
  Query: {
    users: () => {
      return users;
    },
    user: (_, { id }) => {
      return users.find((user) => user.id === id);
    },
  },
  User: {
    __resolveReference: ({ id }) => {
      return users.find((user) => user.id === id);
    },
  },
  Post: {
    author(post) {
      return users.find((user) => user.id === post.authorId);
    },
    __resolveReference(post) {
      return post;
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

startStandaloneServer(server, {
  listen: {
    port: 4002,
  },
})
  .then(({ url }) => console.log(`Subgraph users running at ${url}.`))
  .catch((e) => console.error(e));
