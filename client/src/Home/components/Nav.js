import React from "react";
import mm_logo from "../../assests/mm_logo.svg";
import "./Nav.css";

const Nav = () => {
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
        <button className=" loginBtn btn btn-primary shadow-none self-center rounded-md text-2xl px-3 py-1 font-semibold  ">
          Login
        </button>
      </div>
    </div>
  );
};

export default Nav;
