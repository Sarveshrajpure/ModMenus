import React from "react";
import mm_logo from "../../assests/mm_logo.svg";
import { useNavigate } from "react-router-dom";
import "./Nav.css";

const Nav = (isHomePage) => {
  const navigate = useNavigate();
  console.log(isHomePage);

  const navigateTo = async () => {
    navigate("/login");
  };
  return (
    <div className="navWrapper">
      <div className="navBlock px-6 md:px-12 lg:px-10 py-4 flex justify-between items-center ">
        <div
          className=" flex  cursor-pointer "
          onClick={() => {
            navigate("/");
          }}
        >
          <img
            className=" w-2/5  md:w-2/3 lg:w-5/12 "
            src={mm_logo}
            alt="logo"
          />
        </div>
        {isHomePage.isHomePage === true ? (
          <div
            className="goToLoginBtn 
         text-lg   md:text-xl  lg:text-xl "
            onClick={() => {
              navigateTo();
            }}
          >
            Login
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Nav;
