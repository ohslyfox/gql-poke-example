import { PokeApi } from "./index";
import { first, last } from "lodash";
import * as Entities from "./types";
import * as Poke from "../types";

export class NormalizedPokeApi {
  /**
   * Gets a normalized pokemon list
   * @param numToList, amount of pokemon to list, if undefined lists all
   */
  public static async listPokemon(numToList?: number): Promise<Poke.Pokemon[]> {
    const res: Poke.Pokemon[] = [];
    let page = "0";
    let done = false;
    while (!done) {
      const list = await PokeApi.getPokemonList(page);
      if (list.results) {
        for (const result of list.results) {
          const id = last(
            result.url.substring(0, result.url.length - 1).split("/")
          );
          if (id) {
            res.push(await this.getPokemon(id));
          }
        }
      }

      page = first(list.next?.match(/(?<=offset=)(\d+)/g));
      if (!page || (numToList && res.length >= numToList)) {
        done = true;
      }
    }
    return res;
  }

  private static async getPokemon(id: string): Promise<Poke.Pokemon> {
    const pokemonInfo = await PokeApi.getPokemonInfo(id);
    const evolution = await this.getPokemonEvolutionList(id);

    return {
      name: pokemonInfo.name,
      evolutionNames: evolution,
      imageUrl: pokemonInfo.sprites?.front_default,
    };
  }

  private static async getPokemonEvolutionList(id: string): Promise<string[]> {
    const res: string[] = [];
    const data = await PokeApi.getPokemonEvolutionChain(id);

    if (data.chain) {
      if (data.chain.species.name) {
        res.push(data.chain.species.name);
      }
      if (data.chain.evolves_to) {
        let next: any | undefined = first(data.chain.evolves_to);
        while (next) {
          const current = Entities.pokemonEvolutionChain.parse(next);
          if (current) {
            res.push(current.species.name);
          }
          next = first(current.evolves_to);
        }
      }
    }

    return res;
  }
}
