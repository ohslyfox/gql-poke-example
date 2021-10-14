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
          const id = this.trimIdFromUrl(result.url);
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

  public static async getPokemon(nameOrId: string): Promise<Poke.Pokemon> {
    const info = await PokeApi.getPokemonInfo(nameOrId);
    const species = await PokeApi.getPokemonSpeciesInfo(nameOrId);
    const evolId = this.trimIdFromUrl(species.evolution_chain.url);
    const evolution = await this.getPokemonEvolutionList(evolId);

    return {
      name: info.name,
      evolutionNames: evolution,
      imageUrl: info.sprites?.front_default,
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

  private static trimIdFromUrl(url: string): string {
    return last(url.substring(0, url.length - 1).split("/"));
  }
}
