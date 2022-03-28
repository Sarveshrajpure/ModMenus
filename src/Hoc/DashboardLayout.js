import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./DashboardLayout.css";

export const links = [
  {
    name: "DashBoard",
    linkTo: "/dashboard",
  },

  {
    name: "Menu",
    linkTo: "/dashboard/editMenu",
  },

  {
    name: "Customers",
    linkTo: "/dashboard/customers",
  },
];

const DashboardLayout = (props) => {
  const [open, setOpen] = useState("hidden");
  const [menu, setMenu] = useState("close");
  const getLinks = (links) =>
    links.map((item, i) => (
      <div className={`dashboardLayoutlink ${menu} py-2 px-2  lg:py-4`}>
        <Link to={item.linkTo} key={`${links.name}${i}`}>
          {item.name}
        </Link>
      </div>
    ));

  const handleMenu = () => {
    if (open === "hidden") {
      setOpen("block");
      setMenu("open");
    } else {
      setOpen("hidden");
      setMenu("close");
    }
  };
  return (
    <div className="dashboardLayoutWrapper">
      <div className="dashboardLayoutBlock   ">
        <div className={`dashboardLayoutLeftNavWrapper ${menu} lg:py-4`}>
          <div className="flex justify-between align-middle  px-4 py-5 ">
            <h2 className=" font-bold text-xl ">Business DashBoard</h2>
            <div
              onClick={() => {
                handleMenu();
              }}
            >
              <i
                className={`fa-solid fa-bars ${menu} px-4 text-xl lg:hidden`}
              ></i>
            </div>
          </div>
          <div
            className={`dashboardLayoutLeftNavLinks ${menu} ${open}  lg:block  lg:pl-10   `}
          >
            {getLinks(links)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
