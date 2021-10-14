import * as z from "myzod";

export type PokemonEvolutionChain = z.Infer<typeof pokemonEvolutionChain>;
export const pokemonEvolutionChain = z
  .object({
    evolves_to: z.array(z.unknown().optional()).or(z.undefined()),
    species: z.object({ name: z.string(), url: z.string() }),
  })
  .allowUnknownKeys()
  .or(z.undefined());

export type PokemonEvolutionResponse = z.Infer<typeof pokemonEvolutionResponse>;
export const pokemonEvolutionResponse = z
  .object({
    chain: pokemonEvolutionChain,
  })
  .allowUnknownKeys();

export type PokemonTypeResult = z.Infer<typeof pokemonTypeResult>;
export const pokemonTypeResult = z.object({
  slot: z.number(),
  type: z.object({
    name: z.string(),
    url: z.string(),
  }),
});

export type PokemonInfo = z.Infer<typeof pokemonInfo>;
export const pokemonInfo = z
  .object({
    name: z.string(),
    sprites: z
      .object({ front_default: z.string().nullable() })
      .allowUnknownKeys(),
    types: z.array(pokemonTypeResult),
  })
  .allowUnknownKeys();

export type PokemonListResult = z.Infer<typeof pokemonListResult>;
export const pokemonListResult = z.object({
  name: z.string(),
  url: z.string(),
});

export type PokemonListResponse = z.Infer<typeof pokemonListResponse>;
export const pokemonListResponse = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(pokemonListResult),
});
