import { PokeApi } from "./index";
import { first, last } from "lodash";
import * as Entities from "./types";
import * as Poke from "../types";

export class NormalizedPokeApi {
  public static async listPokemon(numToList: number): Promise<string[]> {
    const res: string[] = [];
    let page: string | undefined = "0";
    let done = false;
    while (!done) {
      const list: Entities.PokemonListResponse = await PokeApi.getPokemonList(
        page
      );
      if (list.results) {
        for (const result of list.results) {
          res.push(result.name);
        }
      }

      page = first(list.next?.match(/(?<=offset=)(\d+)/g) ?? "");
      if (!page || (numToList !== 0 && res.length >= numToList)) {
        done = true;
      }
    }
    return res
      .filter((r) => !r.includes("-"))
      .slice(0, numToList === 0 ? res.length : numToList);
  }

  public static async getPokemonWithEvolutions(
    nameOrId: string
  ): Promise<Poke.PokemonWithEvolutions> {
    const info = await this.getPokemonInfo(nameOrId);
    const species = await PokeApi.getPokemonSpeciesInfo(nameOrId);
    const evolId = this.trimIdFromUrl(species.evolution_chain.url);
    const evolution = await this.getPokemonEvolutionList(evolId);

    return {
      name: info.name,
      imageUrl: info.imageUrl,
      evolutions: evolution,
    };
  }

  private static async getPokemonInfo(nameOrId: string): Promise<Poke.Pokemon> {
    const info = await PokeApi.getPokemonInfo(nameOrId);

    return {
      name: info.name,
      imageUrl: info.sprites.front_default ?? undefined,
    };
  }

  private static async getPokemonEvolutionList(
    id: string
  ): Promise<Poke.Pokemon[]> {
    const res: Poke.Pokemon[] = [];
    const data = await PokeApi.getPokemonEvolutionChain(id);
    if (data.chain) {
      const q: unknown[] = [data.chain];
      while (q.length > 0) {
        const current = Entities.pokemonEvolutionChain.parse(q.shift());
        if (current) {
          if (current.evolves_to) {
            q.push(...current.evolves_to);
          }
          if (current.species) {
            const info = await this.getPokemonInfo(current.species.name);
            res.push(info);
          }
        }
      }
    }

    return res;
  }

  private static trimIdFromUrl(url: string): string {
    return last(url.substring(0, url.length - 1).split("/")) ?? "";
  }
}
