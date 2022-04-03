import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Menu from "./Menu";
import PrivateRoute from "./Utilities/PrivateRoute";
import PreventSigninRoute from "./Utilities/preventSignRoute";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />

      <Route path="/" element={<PreventSigninRoute />}>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/menu/:menuReference" element={<Menu />} />
      </Route>
      <Route path="/" element={<PrivateRoute />}>
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
export default App;
