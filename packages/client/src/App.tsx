import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Index } from "./pages/Index";

export const App: React.FC = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" component={Index}></Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
