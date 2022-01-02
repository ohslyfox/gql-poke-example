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
  @Field()
  name!: string;

  @Field()
  imageUrl?: string;
}

@ObjectType()
class PokemonWithEvolutions {
  @Field((type) => ID)
  id!: string;

  @Field()
  name!: string;

  @Field((type) => [Pokemon])
  evolutions!: Pokemon[];

  @Field()
  imageUrl?: string;
}

@InputType()
class PokemonWithEvolutionInput {
  @Field()
  name!: string;
}

@InputType()
class PokemonNameListInput {
  @Field()
  count!: number;
}

@Resolver(Pokemon)
export class PokemonResolver {
  @Query((returns) => String)
  public async pokemonName(@Ctx() ctx: GqlContext) {
    return await ctx.pokemonService.getRandomPokemonName();
  }

  @Query((returns) => [String])
  public async pokemonNames(
    @Arg("count") input: PokemonNameListInput,
    @Ctx() ctx: GqlContext
  ): Promise<string[]> {
    return await ctx.pokemonService.getPokemonNames(input.count);
  }

  @Query((returns) => PokemonWithEvolutions)
  public async pokemon(
    @Arg("id") input: PokemonWithEvolutionInput,
    @Ctx() ctx: GqlContext
  ): Promise<PokemonWithEvolutions> {
    const data = await ctx.pokemonService.getPokemon(input.name);
    return {
      id: data.name,
      name: data.name,
      evolutions: data.evolutions,
      imageUrl: data.imageUrl,
    };
  }
}
