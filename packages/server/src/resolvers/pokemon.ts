import { ObjectType, Field, Query, Resolver, ID, Ctx } from "type-graphql";
import { GqlContext } from "../types";

@ObjectType()
class Pokemon {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;
}

@Resolver(Pokemon)
export class PokemonResolver {
  @Query((returns) => [Pokemon])
  public async pokemon(@Ctx() ctx: GqlContext): Promise<Pokemon[]> {
    const data = await ctx.pokemonService.getPokemonList(1);
    return data.map((p) => {
      return {
        id: p.name,
        name: p.name,
      };
    });
  }
}
