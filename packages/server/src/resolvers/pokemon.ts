import {
  ObjectType,
  Field,
  Query,
  Resolver,
  ID,
  Ctx,
  InputType,
  Arg,
} from "type-graphql";
import { GqlContext } from "../types";

@ObjectType()
class Pokemon {
  @Field((type) => ID)
  id!: string;

  @Field()
  name!: string;

  @Field(type => [String])
  evolutionNames!: string[];

  @Field()
  imageUrl?: string;
}

@InputType()
class PokemonInput {
  @Field()
  name!: string;
}

@Resolver(Pokemon)
export class PokemonResolver {
  @Query((returns) => [Pokemon])
  public async pokemons(@Ctx() ctx: GqlContext): Promise<Pokemon[]> {
    const data = await ctx.pokemonService.getPokemonList(1);
    return data.map((p) => {
      return {
        id: p.name,
        name: p.name,
        evolutionNames: p.evolutionNames,
        imageUrl: p.imageUrl,
      };
    });
  }

  @Query((returns) => Pokemon)
  public async pokemon(
    @Arg("id") input: PokemonInput,
    @Ctx() ctx: GqlContext
  ): Promise<Pokemon> {
    const data = await ctx.pokemonService.getPokemon(input.name);
    return {
      id: data.name,
      name: data.name,
      evolutionNames: data.evolutionNames,
      imageUrl: data.imageUrl,
    };
  }
}
