import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
