import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomeMessage from "./components/WelcomeMessage";
import AboutMessage from "./components/AboutMessage";

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<WelcomeMessage />} />
      <Route path="/about/details" element={<AboutMessage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
