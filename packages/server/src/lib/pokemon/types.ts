export interface Pokemon {
  name: string;
  evolutionNames: string[];
  imageUrl?: string;
}

export interface PokemonApiClient {
  getPokemonList(count: number): Promise<Pokemon[]>;
}
