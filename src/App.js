import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Menu from "./Menu";
import CreateMenu from "./Dashboard/components/CreateMenu";
import CategoryItem from "./Dashboard/components/CategoryItem";
import PrivateRoute from "./Utilities/PrivateRoute";
import PreventSigninRoute from "./Utilities/preventSignRoute";

function App() {
  return (
    <Routes>
      <Route exact path="/menu/:menuReference" element={<Menu />} />
      <Route exact path="/" element={<Home />} />
      <Route path="/" element={<PreventSigninRoute />}>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
      </Route>
      <Route path="/" element={<PrivateRoute />}>
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/dashboard/categories" element={<CreateMenu />} />
        <Route
          exact
          path="/dashboard/catergories/items"
          element={<CategoryItem />}
        />
      </Route>
    </Routes>
  );
}
export default App;
