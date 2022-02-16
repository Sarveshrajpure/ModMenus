import React from "react";
import mm_logo from "../../assests/mm_logo.svg";

import "./LoginForm.css";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../validations/loginValidations";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const onLogin = async (data, e) => {
    console.log(data);
    e.preventDefault();
  };
  return (
    <div className="loginFormWrapper">
      <div className="loginFormBlock w-full lg:max-w-lg md:max-w-lg max-w-xs">
        <form
          className="loginForm bg-white shadow-md rounded px-10 pt-5 pb-8 mb-4"
          onSubmit={handleSubmit(onLogin)}
        >
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
              className=" appearance-none border 
              rounded w-full py-2 px-3 text-gray-700 
              leading-tight focus:outline-none
               focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Email"
              {...register("email")}
            />
            {
              <div
                className="invalid-feedback  text-red-500 text-xs px-2 pt-1"
                style={errors.email ? { display: "block" } : {}}
              >
                {errors.email?.message}
              </div>
            }
          </div>

          <div className="mb-10">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <input
              className=" appearance-none border 
              rounded w-full py-2 px-3 text-gray-700 
              leading-tight focus:outline-none
               focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              {...register("password")}
            />{" "}
            {
              <div
                className="invalid-feedback  text-red-500 text-xs px-2 pt-1"
                style={errors.password ? { display: "block" } : {}}
              >
                {errors.password?.message}
              </div>
            }
          </div>

          <div className="loginBtn  shadow-md mt-2   text-lg   md:text-xl md:mt-4  lg:text-xl ">
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

export default LoginForm;
