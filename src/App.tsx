import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomeMessage from "./components/WelcomeMessage";
import AboutMessage from "./components/AboutMessage";
import DemoPage from "./components/demo/DemoPage";

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<WelcomeMessage />} />
      <Route path="/about/details" element={<AboutMessage />} />
      <Route path="/demo" element={<DemoPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
