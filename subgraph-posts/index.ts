import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { readFileSync } from "fs";
import gql from "graphql-tag";
import { posts } from "./data";

const typeDefs = gql(readFileSync("./schema.graphql", { encoding: "utf-8" }));

const resolvers = {
  Query: {
    posts: () => {
      return posts;
    },
    post: (_, { id }) => {
      return posts.find((post) => post.id === id);
    },
  },
  Post: {
    __resolveReference: ({ id }) => {
      return posts.find((post) => post.id === id);
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

startStandaloneServer(server, {
  listen: {
    port: 4001,
  },
})
  .then(({ url }) => console.log(`Subgraph posts running at ${url}`))
  .catch((e) => console.error(e));
