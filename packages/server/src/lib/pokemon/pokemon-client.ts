import * as Poke from "./types";
import { NormalizedPokeApi } from "./api/normalize";

export class PokemonService implements Poke.PokemonApiClient {
  private pokemonNames: string[];

  constructor() {
    this.pokemonNames = [];
  }

  public async init() {
    this.pokemonNames = await this.getPokemonNames(0);
  }

  public async getRandomPokemonName(): Promise<string> {
    return this.pokemonNames[
      Math.floor(Math.random() * this.pokemonNames.length)
    ];
  }

  public async getPokemonNames(count: number): Promise<string[]> {
    return await NormalizedPokeApi.listPokemon(count);
  }

  public async getPokemon(name: string): Promise<Poke.PokemonWithEvolutions> {
    return await NormalizedPokeApi.getPokemonWithEvolutions(name);
  }
}
