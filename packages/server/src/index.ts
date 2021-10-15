import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { PokemonService } from "./lib/pokemon/pokemon-client";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { GqlContext } from "./types";
import { buildTypeDefsAndResolvers } from "type-graphql";
import { PokemonResolver } from "./resolvers/pokemon";
import express from "express";
import http from "http";

const main = async (): Promise<void> => {
  const pokemonService = new PokemonService();

  const app = express();
  const httpServer = http.createServer(app);

  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    resolvers: [PokemonResolver],
  });

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => {
      return { req, res, pokemonService } as GqlContext;
    },
  });

  await server.start();
  server.applyMiddleware({
    app,
    cors: {
      origin: [
        "http://localhost:3000",
        "https://studio.apollographql.com",
      ],
      credentials: true,
    },
  });

  await new Promise((resolve) =>
    httpServer.listen({ port: 4000 }, () => resolve(true))
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};

main();
