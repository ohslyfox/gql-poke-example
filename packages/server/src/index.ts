import { ApolloServer, gql } from "apollo-server";
import PokemonApiClient from "./lib/pokemon";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Pokemon {
    name: String
  }

  type Query {
    pokemon: [Pokemon]
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    pokemon: async () => pokeClient.getPokemonList(1),
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

const pokeClient = new PokemonApiClient();

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
