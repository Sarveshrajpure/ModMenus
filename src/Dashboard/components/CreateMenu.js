import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { categorySchema } from "../../validations/menuValidation";
import Category from "./Category";
import { CreateCategory, FetchCategory } from "../menuActions";
import DashboardLayout from "../../Hoc/DashboardLayout";
import "./CreateMenu.css";

const CreateMenu = () => {
  const [categories, setCategories] = useState();
  const [categoryError, setCategoryError] = useState();

  const menu = useSelector((state) =>
    state.User.loginInfo.user.firstname ? state.User.loginInfo.menuInfo : null
  );

  useEffect(() => {
    (async function () {
      try {
        let sendData = {
          menuId: menu ? menu._id : null,
        };
        const response = await FetchCategory(sendData);
        if (response) {
          console.log(response);
          setCategories({ data: response });
        } else {
          setCategories("");
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(categorySchema),
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();

    try {
      if (data) {
        console.log(data);
        let sendData = {
          name: data.name,
          time: data.time,
          menuId: menu._id,
        };
        console.log(sendData);

        let response = await CreateCategory(sendData);
        if (response) {
          console.log(response);
        }
      }
    } catch (err) {
      if (err.response) {
        setCategoryError(err.response.data.message);
      } else {
        setCategoryError(err.message);
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="createMenuFormWrapper">
        <div className="loginFormBlock w-full lg:w-4/6  ">
          <form
            className="loginForm  px-10 pb-8 mb-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="LoginTitle text-center  font-extrabold pb-6">
              Let's create
              <span className="text-orange-600"> your digital menu</span>
              <p className="text-lg py-2">Step 1</p>
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="name"
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

            <div
              className="invalid-feedback text-center text-red-500 text-xs px-2 py-2 pt-1 "
              style={categoryError ? { display: "block" } : {}}
            >
              {categoryError ? categoryError : null}
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="time"
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
                placeholder="Enter time slot for which this CATGEORY will be served"
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

            <div className="flex justify-center">
              <button
                type="submit"
                className="createBtn   shadow-md mt-2  
           text-lg   md:text-xl md:mt-4  lg:text-xl"
              >
                Create Category
              </button>
            </div>
          </form>{" "}
          <div className="categoryContainer flex flex-wrap px-10  mb-4 ">
            {categories
              ? categories.data.map((item) => <Category info={item} />)
              : null}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateMenu;
