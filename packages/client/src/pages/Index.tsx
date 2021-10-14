import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import { Pokemon } from "../components/Pokemon";

export const Index: React.FC = () => {
  const [text, setText] = useState("pikachu");
  const [pokemonName, setPokemonName] = useState("pikachu");
  return (
    <Container>
      <Box component="span" sx={{ padding: 10, mx: "2px" }}>
        <Card
          style={{
            backgroundColor: "#d5d5d5",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <CardContent>
            <h1 style={{ textAlign: "center" }}>Enter a Pokemon Name</h1>
          </CardContent>
          <CardContent>
            <Box sx={{ mx: 10 }}>
              <TextField
                fullWidth
                inputProps={{ style: { textAlign: "center" } }}
                defaultValue="pikachu"
                onChange={(e) => setText(e.target.value)}
              />
            </Box>
          </CardContent>
          <CardContent>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setPokemonName(text)}
            >
              Submit
            </Button>
          </CardContent>
          <CardContent>
            <Pokemon name={pokemonName}></Pokemon>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};
