import { useQuery } from "@apollo/client";
import { Card, CardContent, Container, Grid } from "@material-ui/core";
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
          <img src={imgUrl} width="256" alt="pokemon"></img>
        </CardContent>
        <Grid container spacing={2} justifyContent="center">
          {data.pokemon.evolutions.map((e: any) => (
            <Grid item xs={2} key={e.name}>
              <>
                <img src={e.imageUrl} alt={e.name}></img>
                <p>{e.name}</p>
              </>
            </Grid>
          ))}
        </Grid>
      </Card>
    </Container>
  );
};
