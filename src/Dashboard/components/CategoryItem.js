import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ItemSchema } from "../../validations/menuValidation";
import { useSelector } from "react-redux";
import { FetchCategory } from "../menuActions";
import { CreateFoodItem, FetchFoodItem } from "../menuActions";
import { useNavigate } from "react-router-dom";
import Item from "./Item";
import spinner from "../../assests/spinner.gif";
import "./CategoryItem.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategoryItem = () => {
  const [category, setCategory] = useState();
  const [categoryError, setCategoryError] = useState();
  const [categories, setCategories] = useState();
  const [foodItems, setFoodItems] = useState();
  const [foodItemCreated, setFoodItemCreated] = useState(false);
  const [fileInput, setFileInput] = useState("");
  const [emptyCategoryMessage, setEmptyCategoryMessage] = useState(undefined);
  const navigate = useNavigate();
  const [preview, setPreview] = useState("");
  const [loader, setLoader] = useState(false);

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
        let sendData = {
          menuId: menu ? menu._id : null,
        };

        const response = await FetchCategory(sendData);
        if (response) {
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
        if (category) {
          setLoader(true);
          let dataToBeSent = { categoryId: category };
          const response = await FetchFoodItem(dataToBeSent);
          if (response) {
            setLoader(false);
            setFoodItems({ data: response });
            setEmptyCategoryMessage(undefined);
            if (response.length <= 0) {
              setEmptyCategoryMessage(
                "This Category does not contain any food item"
              );
            }
          } else {
            setFoodItems("");
            setLoader(false);
          }
        }
      } catch (err) {
        setLoader(false);
      }
    })();
  }, [category, foodItemCreated]);

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setPreview(reader.result);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(ItemSchema),
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();

    try {
      if (data && category) {
        setCategoryError("");
        setLoader(true);

        let sendData = {
          name: data.name,
          description: data.description,
          categoryId: category,
          menuId: menu._id,
          price: data.price,
          image: preview,
        };

        let response = await CreateFoodItem(sendData);
        setLoader(false);
        reset();
        notify("Food Item added successfully!");
        setFoodItemCreated((prev) => !prev);
        setPreview("");
      } else {
        setCategoryError("Select Catergory first");
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
    <>
      {categories ? (
        <div className="lg:flex">
          <div className=" w-full lg:w-8/12">
            <div className="AddFoodItemTitle  text-center text-2xl font-semibold pb-2">
              Create a Food Item
            </div>
            <p className="text-center pb-4">
              Please select a category to create a food item
            </p>
            <div className="dropdowCategoryWrapper text-sm flex pl-8 pb-5">
              <div className="text-lg px-2">Category: </div>
              <select
                className="dropdownCategory text-lg p-1 ml-2"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <option disabled selected>
                  Select a category
                </option>
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
              {category === undefined ? (
                ""
              ) : (
                <div className="loginFormBlock w-full   ">
                  <form
                    className="loginForm px-10 pb-8 mb-4"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="mb-6">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="name"
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

                    <div className="mb-6">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="description"
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
                        htmlFor="price"
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

                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="description"
                    >
                      Add an image
                    </label>

                    <div className="flex justify-center mb-8">
                      <input
                        type="file"
                        name="image"
                        onChange={handleFileInputChange}
                        value={fileInput}
                        className="form-input"
                      />
                    </div>
                    <div className="flex justify-center mb-8">
                      {preview ? (
                        <img
                          className="  foodItemImagePreview w-1/5"
                          src={preview}
                          alt="ImgPreview"
                        />
                      ) : (
                        ""
                      )}
                    </div>
                    <div
                      className="invalid-feedback text-center text-red-500 text-xs px-2 py-2 pt-1 "
                      style={categoryError ? { display: "block" } : {}}
                    >
                      {categoryError ? categoryError : null}
                    </div>
                    {loader ? (
                      <div className="flex justify-center mt-1">
                        <img className="w-12" src={spinner} alt="spinner" />
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <button
                          type="submit"
                          className="createBtn   shadow-md  
         text-lg   md:text-xl md:mt-4  lg:text-xl"
                        >
                          Create Item
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              )}
            </div>
          </div>

          <div className="categoryContainer flex flex-wrap lg:block lg:w-4/12   lg:overflow-y-auto lg:px-0 px-10 mt-6  mb-4 ">
            {loader ? (
              <div className="flex justify-center">
                <img className="w-16" src={spinner} alt="spinner" />
              </div>
            ) : (
              <>
                {emptyCategoryMessage ? (
                  <div className="text-center mt-8 text-black">
                    {emptyCategoryMessage}
                  </div>
                ) : (
                  <div className="categoryContainer flex flex-wrap lg:block lg:w-full  lg:overflow-y-auto lg:px-0 px-10  mb-4 mt-2 ">
                    {foodItems
                      ? foodItems.data.map((item, index) => (
                          <Item info={item} key={index} />
                        ))
                      : null}
                  </div>
                )}
              </>
            )}
          </div>

          <ToastContainer />
        </div>
      ) : (
        <div> Please Create Catergories first</div>
      )}
    </>
  );
};

export default CategoryItem;
