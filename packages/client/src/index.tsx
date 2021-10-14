import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

const test = gql`
  query ExampleQuery {
    pokemon {
      name
     }
  }
`;

// function TestComponent() {
//   const { loading, error, data } = useQuery(test);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error</p>;

//   console.log(data);
//   return data.pokemon.map((pk: any) => <p>{pk.name}</p>);
// }

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
