import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Menu from "./Menu";
import CreateCategory from "./Dashboard/components/CreateCategory";
import CategoryItem from "./Dashboard/components/CategoryItem";
import EditCategory from "./Dashboard/components/EditCategory";
import EditFoodItems from "./Dashboard/components/EditFoodItems";
import PrivateRoute from "./Utilities/PrivateRoute";
import PreventSigninRoute from "./Utilities/preventSignRoute";
import PublicRoute from "./Utilities/PublicRoute";
import ViewCustomerData from "./Dashboard/components/ViewCustomerData";

function App() {
  return (
    <Routes>
      <Route exact path="/menu/:menuReference" element={<Menu />} />
      <Route path="/" element={<PublicRoute />}>
        <Route exact path="/" element={<Home />} />
      </Route>
      <Route path="/" element={<PreventSigninRoute />}>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
      </Route>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="createcategory" element={<CreateCategory />} />
          <Route path="createcategoryitem" element={<CategoryItem />} />
          <Route path="editcategory" element={<EditCategory />} />
          <Route path="editfooditem" element={<EditFoodItems />} />
          <Route path="viewcustomerdata" element={<ViewCustomerData />} />
        </Route>
      </Route>
    </Routes>
  );
}
export default App;
