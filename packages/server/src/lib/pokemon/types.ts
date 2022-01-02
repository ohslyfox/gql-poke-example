export interface Pokemon {
  name: string;
  imageUrl?: string;
}

export interface PokemonWithEvolutions extends Pokemon {
  evolutions: Pokemon[];
}

export interface PokemonApiClient {
  getRandomPokemonName(): Promise<string>;
  getPokemonNames(count: number): Promise<string[]>;
  getPokemon(name: string): Promise<PokemonWithEvolutions>;
}
