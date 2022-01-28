import React from "react";
import qr_logo from "../../assests/qr_logo.png";
import "./Nav.css";

const Nav = () => {
  return (
    <div className="navWrapper">
      <div className="navBlock px-2 py-2 flex justify-between md:px-20 md:py-6  lg:px-32  lg:py-8">
        <div className=" flex ">
          <img className="w-16 md:w-22 lg:w-18" src={qr_logo} alt="logo" />
          <h1
            className="text-3xl  md:text-4xl  lg:text-4xl
           font-semibold tracking-wide self-center px-2 text-orange-400   "
          >
            Mod Menus
          </h1>
        </div>
        <div className="loginBtn bg-indigo-600 text-slate-100 self-center text-xl px-3 py-1 rounded-t-xl rounded-b-xl font-semibold ">
          Login
        </div>
      </div>
    </div>
  );
};

export default Nav;
