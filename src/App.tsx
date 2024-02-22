import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomeMessage from "./components/WelcomeMessage/WelcomeMessage";
import AboutMessage from "./components/AboutMessage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomeMessage />} />
        <Route path="/about/details" element={<AboutMessage />} />
      </Routes>
    </BrowserRouter>
  );
}
