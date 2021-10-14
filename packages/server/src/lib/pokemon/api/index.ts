import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import * as Entities from "./types";
import { Type } from "myzod";

export class PokeApi {
  public static async getPokemonEvolutionChain(
    id: string
  ): Promise<Entities.PokemonEvolutionResponse> {
    const config: AxiosRequestConfig = {
      method: "get",
      url: `evolution-chain/${id}`,
    };

    return await this.request(config, Entities.pokemonEvolutionResponse);
  }

  public static async getPokemonSpeciesInfo(
    id: string
  ): Promise<Entities.PokemonSpeciesResponse> {
    const config: AxiosRequestConfig = {
      method: "get",
      url: `pokemon-species/${id}`,
    };

    return await this.request(config, Entities.pokemonSpeciesResponse);
  }

  public static async getPokemonInfo(
    id: string
  ): Promise<Entities.PokemonInfo> {
    const config: AxiosRequestConfig = {
      method: "get",
      url: `pokemon/${id}`,
    };

    return await this.request(config, Entities.pokemonInfo);
  }

  public static async getPokemonList(
    offset = "0"
  ): Promise<Entities.PokemonListResponse> {
    const config: AxiosRequestConfig = {
      method: "get",
      url: "pokemon",
      params: {
        offset,
        limit: 1,
      },
    };

    return await this.request(config, Entities.pokemonListResponse);
  }

  private static async request<T>(
    config: AxiosRequestConfig,
    schema: Type<T>
  ): Promise<T> {
    try {
      const res = await this.getClient().request<T>(config);
      return schema.parse(res.data);
    } catch (e) {
      console.error(e);
    }
  }

  private static getClient(): AxiosInstance {
    const config: AxiosRequestConfig = {
      baseURL: "https://pokeapi.co/api/v2/",
      headers: {
        "Content-Type": "application/json",
      },
    };
    return axios.create(config);
  }
}
