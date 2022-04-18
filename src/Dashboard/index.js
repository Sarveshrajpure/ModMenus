import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getMenu } from "./menuActions";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Nav from "../Home/components/Nav";
import { userSignOut } from "../Login/loginAction";
import { useDispatch } from "react-redux";
import { signout_user } from "../Actions/userActions";

const Dashboard = () => {
  const [qr, setQr] = useState("");
  const [loader, setLoader] = useState(false);
  const [navSelection, setNavSelection] = useState("Dashboard");
  const [open, setOpen] = useState("hidden");
  const [menu, setMenu] = useState("close");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const menu = useSelector((state) =>
  //   state.User.loginInfo.user.firstname ? state.User.loginInfo.menuInfo : null
  // );

  useEffect(() => {
    async function getQr() {
      try {
        if (menu.menuReference) {
          setLoader(true);
          let response = await getMenu(menu.menuReference);
          console.log(response.data[0].menuData.qrLink);
          setQr(response.data[0].menuData.qrLink);
          setLoader(false);
        }
      } catch (error) {
        setLoader(false);
        console.log(error);
      }
    }
    getQr();
  }, [menu.menuReference]);

  const user = useSelector((state) =>
    state.User.user_verification.user ? state.User.user_verification.user : null
  );

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
            className={`dashboardLayoutLeftNavLinks   lg:block  absolute w-full  z-10 lg:static  `}
          >
            <Link to="/dashboard">
              <div
                className="py-2 px-10 lg:py-2  border-dashed border-b-2 cursor-pointer  "
                onClick={() => {
                  setNavSelection("Dashboard");
                }}
              >
                <div
                  className={`rounded p-2 pl-2 pr-2 w-max transition-all select-none ${
                    navSelection === "Dashboard" ? "bg-sky-900 text-white" : ""
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
                  setNavSelection("AddMenuCategories");
                }}
              >
                <div
                  className={`rounded p-2 pl-2 pr-2 w-max transition-all select-none ${
                    navSelection === "AddMenuCategories"
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
                  setNavSelection("AddMenuFoodItems");
                }}
              >
                <div
                  className={`rounded p-2 pl-2 pr-2 w-max transition-all select-none ${
                    navSelection === "AddMenuFoodItems"
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
                  setNavSelection("EditCategories");
                }}
              >
                <div
                  className={`rounded p-2 pl-2 pr-2 w-max transition-all select-none ${
                    navSelection === "EditCategories"
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
                  setNavSelection("EditFoodItems");
                }}
              >
                <div
                  className={`rounded p-2 pl-2 pr-2 w-max transition-all select-none ${
                    navSelection === "EditFoodItems"
                      ? "bg-sky-900 text-white"
                      : ""
                  } `}
                >
                  Edit Food Items
                </div>
              </div>
            </Link>

            <div
              className="y-2 px-10 lg:py-2 border-dashed border-b-2 cursor-pointer"
              onClick={() => {
                setNavSelection("ViewCustomerData");
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
            </div>

            <div
              className="py-2 px-12 lg:py-4 border-dashed border-b-2 cursor-pointer"
              onClick={() => {
                dispatch(signout_user());
                logoutUser();
              }}
            >
              Logout
            </div>
          </div>
        </div>

        <div className="dashboardLayoutRightWrapper rounded lg:w-4/5 bg-gray-100 mt-2 ml-8 mr-5 mb-2 p-2">
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
