import { gql } from "@apollo/client";

export const GET_POKEMON_BY_NAME = gql`
  query GET_POKEMON_BY_NAME($input: PokemonInput!) {
    pokemon(id: $input) {
      name
      imageUrl
      evolutionNames
    }
  }
`;
