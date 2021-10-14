import * as Poke from "./types";
import { NormalizedPokeApi } from "./api/normalize";

export class PokemonService implements Poke.PokemonApiClient {
  constructor() {}

  public async getPokemonList(count: number): Promise<Poke.Pokemon[]> {
    return await NormalizedPokeApi.listPokemon(count);
  }

  public async getPokemon(name: string): Promise<Poke.Pokemon> {
    return await NormalizedPokeApi.getPokemon(name);
  }
}
