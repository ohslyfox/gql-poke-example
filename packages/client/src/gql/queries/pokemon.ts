import { gql } from "@apollo/client";

export const GET_POKEMON_BY_NAME = gql`
  query GET_POKEMON_BY_NAME($input: PokemonWithEvolutionInput!) {
    pokemon(id: $input) {
      name
      imageUrl
      evolutions {
        name
        imageUrl
      }
    }
  }
`;

export const GET_POKEMON_NAMES = gql`
  query GET_POKEMONS($input: PokemonNameListInput!) {
    pokemonNames(count: $input)
  }
`;

export const GET_RANDOM_POKEMON = gql`
  query GET_RANDOM_POKEMON {
    pokemonName
  }
`;
