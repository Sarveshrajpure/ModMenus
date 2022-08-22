import React, { useState, useEffect, useRef } from "react";
import { getMenu } from "./menuActions";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Nav from "../Home/components/Nav";
import { userSignOut } from "../Login/loginAction";
import { useDispatch } from "react-redux";
import { signout_user } from "../Actions/userActions";
import "./dashboard.css";
import { initSocket } from "../Utilities/socketIoConfig";

const Dashboard = () => {
  const [qr, setQr] = useState("");
  const [loader, setLoader] = useState(false);
  const socketRef = useRef(null);
  const [navSelection, setNavSelection] = useState("Dashboard");
  const [open, setOpen] = useState("hidden");
  const [menu, setMenu] = useState("close");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    var pathArray = [];
    pathArray = window.location.pathname.split("/");
    let pathArrayLength = pathArray.length;
    let currentSelection = pathArray[pathArrayLength - 1];
    console.log(currentSelection);
    setNavSelection(currentSelection);
  }, []);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("newOrder", async (newOrder) => {
        console.log(newOrder);
      });
    };
    init();
  }, []);

  function capitalizeFirstLetter(string) {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }

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
      <div className="dashBoardTitle flex justify-between align-middle bg-zinc-900 text-white  px-10 py-5 ">
        <h2 className=" font-bold text-xl ">Business Dashboard</h2>

        <div
          onClick={() => {
            handleMenu();
          }}
        >
          <i className={`fa-solid fa-bars ${menu} px-4 text-xl lg:hidden`}></i>
        </div>
      </div>
      <div className="dashboardLayoutBlock  lg:flex   ">
        <div
          className={`dashboardLayoutLeftNavWrapper ${menu} lg:py-4 lg:w-1/5`}
        >
          <div
            className={`dashboardLayoutLeftNavLinks ${menu} ${open}  lg:block absolute w-full z-10 lg:static   `}
          >
            <Link to="dashboardhome">
              <div
                className="py-2 px-10 lg:py-2  border-dashed border-b-2 cursor-pointer  "
                onClick={() => {
                  setNavSelection("dashboardhome");
                  setOpen("hidden");
                  setMenu("close");
                }}
              >
                <div
                  className={`rounded p-2 pl-2 pr-2 w-max transition-all select-none ${
                    navSelection === "dashboardhome"
                      ? "bg-sky-900 text-white"
                      : ""
                  } `}
                >
                  Dashboard
                </div>
              </div>
            </Link>

            <Link to="createcategory">
              <div
                className="py-2 px-10 lg:py-2 border-dashed border-b-2 cursor-pointer"
                onClick={() => {
                  setNavSelection("createcategory");
                  setOpen("hidden");
                  setMenu("close");
                }}
              >
                <div
                  className={`rounded p-2 pl-2 pr-2 w-max transition-all select-none ${
                    navSelection === "createcategory"
                      ? "bg-sky-900 text-white"
                      : ""
                  } `}
                >
                  Add menu categories
                </div>
              </div>
            </Link>
            <Link to="createcategoryitem">
              <div
                className="py-2 px-10 lg:py-2 border-dashed  border-b-2 cursor-pointer"
                onClick={() => {
                  setNavSelection("createcategoryitem");
                  setOpen("hidden");
                  setMenu("close");
                }}
              >
                <div
                  className={`rounded p-2 pl-2 pr-2 w-max transition-all select-none ${
                    navSelection === "createcategoryitem"
                      ? "bg-sky-900 text-white"
                      : ""
                  } `}
                >
                  Add food items
                </div>
              </div>
            </Link>
            <Link to="editcategory">
              <div
                className="py-2 px-10 lg:py-2 border-dashed border-b-2 cursor-pointer"
                onClick={() => {
                  setNavSelection("editcategory");
                  setOpen("hidden");
                  setMenu("close");
                }}
              >
                <div
                  className={`rounded p-2 pl-2 pr-2 w-max transition-all select-none ${
                    navSelection === "editcategory"
                      ? "bg-sky-900 text-white"
                      : ""
                  } `}
                >
                  Edit categories
                </div>
              </div>
            </Link>
            <Link to="editfooditem">
              <div
                className="py-2 px-10 lg:py-2 border-dashed border-b-2 cursor-pointer"
                onClick={() => {
                  setNavSelection("editfooditem");
                  setOpen("hidden");
                  setMenu("close");
                }}
              >
                <div
                  className={`rounded p-2 pl-2 pr-2 w-max transition-all select-none ${
                    navSelection === "editfooditem"
                      ? "bg-sky-900 text-white"
                      : ""
                  } `}
                >
                  Edit Food Items
                </div>
              </div>
            </Link>

            {/* <div
              className="y-2 px-10 lg:py-2 border-dashed border-b-2 cursor-pointer"
              onClick={() => {
                setNavSelection("ViewCustomerData");
                setOpen("hidden");
                setMenu("close");
              }}
            >
              <Link to="viewcustomerdata">
                <div
                  className={`rounded p-2 pl-2 pr-2 w-max transition-all select-none  ${
                    navSelection === "ViewCustomerData"
                      ? "bg-sky-900 text-white"
                      : ""
                  } `}
                >
                  View customer data
                </div>
              </Link>
            </div> */}

            <div
              className="py-2 px-12 lg:py-4 border-dashed border-b-2 cursor-pointer"
              onClick={() => {
                dispatch(signout_user());
                logoutUser();
                setOpen("hidden");
                setMenu("close");
              }}
            >
              Logout
            </div>
          </div>
        </div>

        <div className="dashboardLayoutRightWrapper rounded  lg:w-4/5 bg-gray-100 mt-2 ml-8 mr-5 mb-2 p-2">
          <div className="dashboardLayoutRightContentContainer">
            <Outlet />
          </div>

          <p className="text-center text-gray-500 text-xs mt-4">
            &copy;2021 MOD MENUS Corp. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
