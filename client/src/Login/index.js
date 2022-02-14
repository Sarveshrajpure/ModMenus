import React from "react";
import mm_logo from "../assests/mm_logo.svg";
import "./login.css";

const Login = () => {
  return (
    <div className="registerWrapper ">
      <div className="registerFormBlock w-full lg:max-w-lg  max-w-sm">
        <form className="registerForm bg-white shadow-md rounded px-10 pt-5 pb-8 mb-4">
          <img
            className="logoImg w-1/3 md:w-1/4
            lg:w-1/4
            pt-2
            pb-2
            "
            src={mm_logo}
            alt="logo"
          />

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="Email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border 
              rounded w-full py-2 px-3 text-gray-700 
              leading-tight focus:outline-none
               focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Email"
            />
          </div>
          <div className="mb-10">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border 
              rounded w-full py-2 px-3 text-gray-700 
              leading-tight focus:outline-none
               focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>

          <div className="loginBtn  shadow-md mt-2   text-lg   md:text-xl md:mt-4  lg:text-xl md:mt-8">
            Login
          </div>
        </form>
        <p class="text-center text-gray-500 text-xs mt-4">
          &copy;2021 MOD MENUS Corp. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
