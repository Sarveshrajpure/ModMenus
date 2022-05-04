import React from "react";
import { Outlet } from "react-router-dom";

import MenuFooter from "./components/ModMenuFooter";

const MenuRoute = () => {
  return (
    <React.Fragment>
      <>
        <Outlet />
        <MenuFooter />
      </>
    </React.Fragment>
  );
};

export default MenuRoute;
