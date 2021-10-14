import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
} from "@material-ui/core";

export const Index: React.FC = () => {
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
              />
            </Box>
          </CardContent>
          <CardContent>
            <Button variant="contained" color="primary">Submit</Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};
