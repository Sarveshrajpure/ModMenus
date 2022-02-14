import React from "react";
import mm_logo from "../../assests/mm_logo.svg";
import { useNavigate } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  const navigate = useNavigate();

  const navigateTo = async () => {
    navigate("/login");
  };
  return (
    <div className="navWrapper">
      <div className="navBlock px-2 py-2 flex justify-between ">
        <div className=" flex ">
          <img
            className=" w-2/5  md:w-2/3 lg:w-2/3 "
            src={mm_logo}
            alt="logo"
          />
        </div>

        <div
          className="goToLoginBtn   mt-2  
         text-lg   md:text-xl md:mt-4  lg:text-xl md:mt-8"
          onClick={() => {
            navigateTo();
          }}
        >
          Login
        </div>
      </div>
    </div>
  );
};

export default Nav;
