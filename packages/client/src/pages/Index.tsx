import * as UI from "@material-ui/core";
import { useEffect, useState } from "react";
import { Pokemon } from "../components/Pokemon";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { GET_RANDOM_POKEMON } from "../gql";

const StyledInput = styled.input`
  font-size: 20px;
  border: none;
  text-align: center;
`;

const SyledButton = UI.styled(UI.Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 18,
  padding: "6px 12px",
  border: "1px solid",
  borderColor: "black",
  backgroundColor: "#0063cc",
  color: "white",
  margin: "5px",
});

export const Index: React.FC = () => {
  const [text, setText] = useState("");
  const [pokemonName, setPokemonName] = useState("");
  const { data, loading, refetch } = useQuery(GET_RANDOM_POKEMON);

  useEffect(() => {
    if (data) {
      setText(data.pokemonName);
      setPokemonName(data.pokemonName);
    }
  }, [data]);

  if (loading) return null;
  return (
    <UI.Container>
      <UI.Box component="span" sx={{ padding: 10, mx: "2px" }}>
        <UI.Card
          style={{
            backgroundColor: "#d5d5d5",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <UI.CardContent>
            <h1 style={{ textAlign: "center" }}>Pokemon API</h1>
          </UI.CardContent>
          <UI.CardContent>
            <form
              onSubmit={(e: any) => {
                setPokemonName(e.target.name.value);
                e.preventDefault();
              }}
            >
              <StyledInput
                type="text"
                name="name"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <br />
              <br />
              <SyledButton type="submit" variant="contained">
                Get Pokemon
              </SyledButton>
              <SyledButton
                onClick={(e) => {
                  refetch();
                }}
              >
                Random Pokemon
              </SyledButton>
            </form>
          </UI.CardContent>
          <UI.CardContent>
            <Pokemon key={pokemonName} name={pokemonName}></Pokemon>
          </UI.CardContent>
        </UI.Card>
      </UI.Box>
    </UI.Container>
  );
};
