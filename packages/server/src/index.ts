import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { PokemonService } from "./lib/pokemon/pokemon-client";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { GqlContext } from "./types";
import { buildTypeDefsAndResolvers } from "type-graphql";
import { PokemonResolver } from "./resolvers/pokemon";

const main = async (): Promise<void> => {
  const pokemonService = new PokemonService();

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

  // The `listen` method launches a web server.
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

main();
