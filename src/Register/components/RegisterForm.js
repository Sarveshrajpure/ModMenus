import React from "react";
import mm_logo from "../../assests/mm_logo.svg";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../validations/registerValidation";

import "./RegisterForm.css";

const RegisterForm = () => {
  const navigate = useNavigate();

  const navigateTo = async () => {
    navigate("/login");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data, e) => {
    console.log(data);
    e.preventDefault();
  };
  return (
    <div className="registerFormWrapper  py-2">
      <div className="registerFormBlock w-full lg:max-w-lg md:max-w-lg max-w-xs">
        <form
          className="registerForm bg-white shadow-md rounded px-14 pt-5 pb-8 mb-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <img
            className="logoImg w-1/3 md:w-1/4 lg:w-1/4 pt-2 pb-6"
            src={mm_logo}
            alt="logo"
          />
          <div className=" lg:flex lg:space-x-4">
            <div className="mb-4 ">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="firstName"
              >
                First Name
              </label>
              <input
                className=" appearance-none border 
              rounded w-full py-2 px-3 text-gray-700 
              leading-tight focus:outline-none
               focus:shadow-outline"
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First Name"
                {...register("firstName")}
              />{" "}
              {
                <div
                  className="invalid-feedback  text-red-500 text-xs px-2 pt-1"
                  style={errors.firstName ? { display: "block" } : {}}
                >
                  {errors.firstName?.message}
                </div>
              }
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="lastName"
              >
                Last Name
              </label>
              <input
                className="appearance-none border 
              rounded w-full py-2 px-3 text-gray-700 
              leading-tight focus:outline-none
               focus:shadow-outline"
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last Name"
                {...register("lastName")}
              />{" "}
              {
                <div
                  className="invalid-feedback  text-red-500 text-xs px-2 pt-1"
                  style={errors.lastName ? { display: "block" } : {}}
                >
                  {errors.lastName?.message}
                </div>
              }
            </div>
          </div>
          <div className="mb-4 ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="businessName"
            >
              Business Name
            </label>
            <input
              className="appearance-none border 
              rounded w-full py-2 px-3 text-gray-700 
              leading-tight focus:outline-none
               focus:shadow-outline"
              id="businessName"
              name="businessName"
              type="text"
              placeholder="Business Name"
              {...register("businessName")}
            />{" "}
            {
              <div
                className="invalid-feedback  text-red-500 text-xs px-2 pt-1"
                style={errors.businessName ? { display: "block" } : {}}
              >
                {errors.businessName?.message}
              </div>
            }
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="Email"
            >
              Email
            </label>
            <input
              className="appearance-none border 
              rounded w-full py-2 px-3 text-gray-700 
              leading-tight focus:outline-none
               focus:shadow-outline"
              id="email"
              name="email"
              type="text"
              placeholder="Email"
              {...register("email")}
            />{" "}
            {
              <div
                className="invalid-feedback  text-red-500 text-xs px-2 pt-1"
                style={errors.email ? { display: "block" } : {}}
              >
                {errors.email?.message}
              </div>
            }
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <input
              className="appearance-none border 
              rounded w-full py-2 px-3 text-gray-700 
              leading-tight focus:outline-none
               focus:shadow-outline"
              id="password"
              name="password"
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
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              className="appearance-none border 
              rounded w-full py-2 px-3 text-gray-700 
              leading-tight focus:outline-none
               focus:shadow-outline"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
            />
            {
              <div
                className="invalid-feedback  text-red-500 text-xs px-2 pt-1"
                style={errors.confirmPassword ? { display: "block" } : {}}
              >
                {errors.confirmPassword?.message}
              </div>
            }
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="registerBtn  shadow-md mt-2  
             text-lg   md:text-xl md:mt-4  lg:text-xl"
            >
              Register
            </button>
          </div>
          <div className="goToLoginLinkBlock text-center   mt-4 text-xs lg:text-sm md:text-sm ">
            <div>Already registered? </div>
            <div
              className="goToLoginLink px-1"
              onClick={() => {
                navigateTo();
              }}
            >
              Login
            </div>
          </div>
        </form>
        <p class="text-center text-gray-500 text-xs mt-4">
          &copy;2021 MOD MENUS Corp. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
