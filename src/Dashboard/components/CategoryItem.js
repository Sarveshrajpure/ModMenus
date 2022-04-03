import React, { useState, useEffect } from "react";
import DashboardLayout from "../../Hoc/DashboardLayout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ItemSchema } from "../../validations/menuValidation";
import { useSelector } from "react-redux";
import { FetchCategory } from "../menuActions";
import { CreateFoodItem, FetchFoodItem } from "../menuActions";
import Item from "./Item";

import "./CategoryItem.css";

const CategoryItem = () => {
  const [category, setCategory] = useState();
  const [categoryError, setCategoryError] = useState();
  const [categories, setCategories] = useState();
  const [foodItems, setFoodItems] = useState();

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
  }, [menu]);

  useEffect(() => {
    (async function () {
      try {
        let sendData = {
          categoryId: category ? category : null,
        };

        const response = await FetchFoodItem(sendData);
        if (response) {
          setFoodItems({ data: response });
        } else {
          setFoodItems("");
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [category]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(ItemSchema),
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();

    try {
      if (data && category) {
        console.log(data);
        let sendData = {
          name: data.name,
          description: data.description,
          categoryId: category,
          price: data.price,
        };
        console.log(sendData);

        let response = await CreateFoodItem(sendData);
        if (response) {
          console.log(response);
        }
      } else {
        setCategoryError("Select Catergory first");
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
      {categories ? (
        <div>
          <div>
            <div className="dropdowCategoryWrapper text-sm flex">
              <div className="text-lg px-2">Select Category: </div>
              <select
                className="dropdownCategory text-lg px-2"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                {categories
                  ? categories.data.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    ))
                  : null}
              </select>
            </div>

            <div className="createCategoryItemFormWrapper">
              <div className="loginFormBlock w-full lg:w-4/6  ">
                <form
                  className="loginForm  px-10 pb-8 mb-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="LoginTitle text-center  font-extrabold pb-6">
                    Let's create
                    <span className="text-orange-600"> your digital menu</span>
                    <p className="text-lg py-2">Step 2</p>
                  </div>
                  <div className="mb-6">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      for="name"
                    >
                      Food Item Name
                    </label>
                    <input
                      className=" appearance-none border 
            rounded w-full py-2 px-3 text-gray-700 
            leading-tight focus:outline-none
             focus:shadow-outline"
                      id="name"
                      type="text"
                      placeholder="Enter Food Item Name"
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
                      for="description"
                    >
                      Description
                    </label>
                    <input
                      className=" appearance-none border 
            rounded w-full py-2 px-3 text-gray-700 
            leading-tight focus:outline-none
             focus:shadow-outline"
                      id="description"
                      type="text"
                      placeholder="Enter dish description"
                      {...register("description")}
                    />
                    {
                      <div
                        className="invalid-feedback  text-red-500 text-xs px-2 pt-1"
                        style={errors.description ? { display: "block" } : {}}
                      >
                        {errors.description?.message}
                      </div>
                    }
                  </div>

                  <div className="mb-6">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      for="price"
                    >
                      Price
                    </label>
                    <input
                      className=" appearance-none border 
            rounded w-full py-2 px-3 text-gray-700 
            leading-tight focus:outline-none
             focus:shadow-outline"
                      id="price"
                      type="text"
                      placeholder="Enter price"
                      {...register("price")}
                    />
                    {
                      <div
                        className="invalid-feedback  text-red-500 text-xs px-2 pt-1"
                        style={errors.price ? { display: "block" } : {}}
                      >
                        {errors.price?.message}
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
                      Create Item
                    </button>
                  </div>
                </form>{" "}
                <div className="categoryContainer flex flex-wrap px-10  mb-4 ">
                  {foodItems
                    ? foodItems.data.map((item) => (
                        <Item info={item} key={item} />
                      ))
                    : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div> Please Create Catergories first</div>
      )}
    </DashboardLayout>
  );
};

export default CategoryItem;
