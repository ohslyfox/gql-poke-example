import { useQuery } from "@apollo/client";
import { Card, CardContent, Container } from "@material-ui/core";
import { GET_POKEMON_BY_NAME } from "../gql";

export interface PokemonInput {
  name: string;
}

export const Pokemon: React.FC<PokemonInput> = ({ name }) => {
  const inputName = name.toLowerCase().trim();
  const { loading, error, data } = useQuery(GET_POKEMON_BY_NAME, {
    variables: { input: { name: inputName } },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Invalid Pokemon</p>;

  const imgUrl =
    inputName === "ditto"
      ? "https://i.imgur.com/MR8nUSy.gif"
      : data.pokemon.imageUrl;
  return (
    <Container>
      <Card>
        <CardContent>
          <p>{data.pokemon.name}</p>
          <img src={imgUrl} width="256" alt="pokemon"></img>
        </CardContent>
        <CardContent>
          {data.pokemon.evolutionNames.map((n: string) => (
            <p>{n}</p>
          ))}
        </CardContent>
      </Card>
    </Container>
  );
};
