import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { categorySchema } from "../../validations/menuValidation";
import Category from "./Category";
import { CreateCategory, FetchCategory } from "../menuActions";
import spinner from "../../assests/spinner.gif";
import "./CreateCategory.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateMenu = () => {
  const [categories, setCategories] = useState();
  const [categoryError, setCategoryError] = useState();
  const [loader, setLoader] = useState(false);
  const [categoryCreatedResponse, setCategoryCreatedResponse] = useState(false);
  const navigate = useNavigate();

  const menu = useSelector((state) =>
    state.User.loginInfo.user.firstname ? state.User.loginInfo.menuInfo : null
  );

  const notify = (message) =>
    toast.success(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  useEffect(() => {
    (async function () {
      try {
        setLoader(true);
        let sendData = {
          menuId: menu ? menu._id : null,
        };

        const response = await FetchCategory(sendData);
        if (response) {
          console.log(response);
          setCategories({ data: response });
          setLoader(false);
          navigate("/dashboard/createcategory");
        } else {
          setCategories("");
        }
      } catch (err) {
        setLoader(false);
        console.log(err);
      }
    })();
  }, [categoryCreatedResponse, menu, navigate]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(categorySchema),
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();

    try {
      if (data) {
        setLoader(true);
        console.log(data);
        let sendData = {
          name: data.name,
          time: data.time,
          menuId: menu._id,
        };
        console.log(sendData);

        let response = await CreateCategory(sendData);
        setLoader(false);
        reset();
        notify("Category created successFully!");
        setCategoryCreatedResponse((prev) => !prev);
      }
    } catch (err) {
      setLoader(false);
      if (err.response) {
        setCategoryError(err.response.data.message);
      } else {
        setCategoryError(err.message);
      }
    }
  };

  return (
    <div className="createMenuFormWrapper ">
      <div className="loginFormBlock w-full lg:flex lg:justify-around ">
        <form
          className="loginForm lg:w-8/12 px-10 pb-8 mb-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="createMenuTitle text-center text-2xl font-semibold  pb-6">
            Create a category
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Category Name
            </label>
            <input
              className=" appearance-none border 
            rounded w-full py-2 px-3 text-gray-700 
            leading-tight focus:outline-none
             focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter Category Name"
              {...register("name")}
            />
            {
              <div
                className="invalid-feedback  text-red-500 text-xs px-2 pt-1"
                style={errors.name ? { display: "block" } : {}}
              >
                {errors.name?.message}
              </div>
            }
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="time"
            >
              Serving Time
            </label>
            <input
              className=" appearance-none border 
            rounded w-full py-2 px-3 text-gray-700 
            leading-tight focus:outline-none
             focus:shadow-outline"
              id="time"
              type="text"
              placeholder="Enter time slot for which this CATEGORY will be served"
              {...register("time")}
            />
            {
              <div
                className="invalid-feedback  text-red-500 text-xs px-2 pt-1"
                style={errors.time ? { display: "block" } : {}}
              >
                {errors.time?.message}
              </div>
            }
          </div>

          <div
            className="invalid-feedback text-center text-red-500 text-xs px-2 py-2 pt-1 "
            style={categoryError ? { display: "block" } : {}}
          >
            {categoryError ? categoryError : null}
          </div>
          {loader ? (
            <div className="flex justify-center">
              <img className="w-16" src={spinner} alt="spinner" />
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                type="submit"
                className="createBtn   shadow-md mt-2  
           text-lg   md:text-xl md:mt-4  lg:text-xl"
              >
                Create Category
              </button>
            </div>
          )}
        </form>
        <div className="categoryContainer flex flex-wrap lg:block lg:w-4/12  lg:overflow-y-auto lg:px-2 px-10  mb-4 ">
          {loader ? (
            <div className="spinner h-screen relative flex justify-center">
              <img
                className="transform absolute top-2/4    w-20 "
                src={spinner}
                alt="Loading"
              />
            </div>
          ) : (
            <div className="w-full">
              {categories
                ? categories.data.map((item) => <Category info={item} />)
                : null}
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateMenu;
