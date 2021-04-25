import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import WelcomeMessage from "./components/WelcomeMessage";
import AboutMessage from "./components/AboutMessage";

const App: React.FC = () => (
  <Router>
    <Route exact path="/">
      <WelcomeMessage />
    </Route>
    <Route exact path="/about/details">
      <AboutMessage />
    </Route>
  </Router>
);

export default App;
