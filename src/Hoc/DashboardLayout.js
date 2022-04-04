import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./DashboardLayout.css";
import { userSignOut } from "../Login/loginAction";
import { useDispatch } from "react-redux";
import { signout_user } from "../Actions/userActions";

import Nav from "../Home/components/Nav";

export const links = [
  {
    name: "Dashboard",
    linkTo: "/dashboard",
  },

  {
    name: "Menu Categories",
    linkTo: "/dashboard/categories",
  },
  {
    name: "Category Items",
    linkTo: "/dashboard/catergories/items",
  },
];

const DashboardLayout = (props) => {
  const [open, setOpen] = useState("hidden");
  const [menu, setMenu] = useState("close");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getLinks = (links) =>
    links.map((item, i) => (
      <div
        className={`dashboardLayoutlink ${menu} py-2 px-10  lg:py-4 w-full`}
        key={i}
        onClick={() => {
          props.setChoice(links.name[i]);
        }}
      >
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

  const logoutUser = async () => {
    try {
      let res = await userSignOut();
      if (res) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="dashboardLayoutWrapper">
      <Nav isHomePage={false} />
      <div className="dashboardLayoutBlock  lg:flex   ">
        <div
          className={`dashboardLayoutLeftNavWrapper ${menu} lg:py-4 lg:w-1/5`}
        >
          <div className="dashBoardTitle flex justify-between align-middle  px-10 py-5 ">
            <h2 className=" font-bold text-xl ">Business Dashboard</h2>
            {/* <img
              src={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAAS0SURBVO3BQY4cSRIEQdNA/f/Lun30UwCJ9OohuSaCP1K15KRq0UnVopOqRSdVi06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYtOqhadVC06qVr0yUtAfpOaJ4A8oeYGyI2aGyA3aiYgv0nNGydVi06qFp1ULfpkmZpNQJ4AcqNmAjIBeQPIjZo31GwCsumkatFJ1aKTqkWffBmQJ9Q8AeQJIDdqJiCTmgnIpOYGyI2aJ4A8oeabTqoWnVQtOqla9Mk/Rs0EZFIzAZmA3ACZ1ExAJjU3av4lJ1WLTqoWnVQt+uQfp+YJNTdAJiA3QP6fnFQtOqladFK16JMvU/M3ATKpeULNBGRSMwGZ1Dyh5k9yUrXopGrRSdWiT5YB+ZMAmdTcqJmATGomIL8JyJ/spGrRSdWik6pFn7yk5m8CZFLzBJBJzY2aCcik5kbN3+SkatFJ1aKTqkWfvARkUjMB2aRmUvNNap4AMqmZ1ExAJjUTkE1qvumkatFJ1aKTqkWfvKRmAjKp+SYgT6iZgNyomYDcqLkB8k1qngAyqXnjpGrRSdWik6pF+COLgNyomYC8oeYGyI2aCcgTat4AMql5Asik5r90UrXopGrRSdUi/JEXgExqngByo+YGyKTmCSA3aiYgN2omIJOaN4A8oWYCMqnZdFK16KRq0UnVIvyRRUCeUHMDZFJzA+QJNTdA3lDzm4DcqPmmk6pFJ1WLTqoW4Y+8AGRScwPkRs0NkEnNnwzIE2omIE+oeQLIpOaNk6pFJ1WLTqoW4Y8sAjKpeQPIN6l5Asik5k8C5EbNN51ULTqpWnRStQh/ZBGQJ9Q8AWRSMwG5UTMBmdRMQJ5QcwNkUjMBmdRMQG7U3ACZ1Gw6qVp0UrXopGoR/sgXAZnUTEDeUHMD5EbNE0AmNROQJ9RsAnKj5ptOqhadVC06qVr0yUtA3lDzBJAJyI2aCcgNkBs1E5A3gExqJiBPqJmA3ACZ1LxxUrXopGrRSdWiT5apmYA8AWQTkEnNG0CeUPMEkBs1m9RsOqladFK16KRq0SdfpuYGyKTmBsgmIDdqboBMam6A3Ki5AXKjZlIzAZnUbDqpWnRSteikatEnXwZkUjOpuQHyhJoJyBNqJiCTmknNBGRS8wSQTUBugExq3jipWnRSteikahH+yF8MyKRmAjKp+SYgN2omIJOaJ4BsUvPGSdWik6pFJ1WLPnkJyG9SM6n5TUBu1NwAeQLIpOYNNd90UrXopGrRSdWiT5ap2QTkBsiNmhsgk5oJyH9JzRNqboDcqHnjpGrRSdWik6pFn3wZkCfUbAJyo+ZGzQTkBsikZlIzAZmAbAIyqfmmk6pFJ1WLTqoWffKPUXMDZALyhJoJyKRmAnKjZhOQGyA3at44qVp0UrXopGrRJ/8YIG+ouQEyqblRcwPkv6Rm00nVopOqRSdViz75MjXfpOYJIG+omYBMat5QMwG5UTMBmdRMQL7ppGrRSdWik6pFnywD8puAPKHmBsiNmknNBGRSMwGZ1ExA3lAzAZnUfNNJ1aKTqkUnVYvwR6qWnFQtOqladFK16KRq0UnVopOqRSdVi06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYv+B8q7ITOaL6L9AAAAAElFTkSuQmCC`}
              alt="qrcode"
            /> */}
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
            className={`dashboardLayoutLeftNavLinks ${menu} ${open}  lg:block  absolute w-full  z-10 lg:static  `}
          >
            {getLinks(links)}

            <button
              className="logoutBtn py-2 px-10 lg:py-4 "
              onClick={() => {
                dispatch(signout_user());
                logoutUser();
              }}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="dashboardLayoutRightWrapper lg:w-4/5 py-10 px-2">
          <div className="dashboardLayoutRightTitle">
            <h1 className="text-2xl">{props.Title}</h1>
          </div>
          <div className="dashboardLayoutRightContentContainer">
            {props.children}
          </div>

          <p class="text-center text-gray-500 text-xs mt-4">
            &copy;2021 MOD MENUS Corp. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
