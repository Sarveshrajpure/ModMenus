import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./EditCategory.css";
import spinner from "../../assests/spinner.gif";
import {
  FetchCategory,
  FetchCategoryById,
  UpdateCategory,
  DeleteCategory,
} from "../menuActions";
import { editCategorySchema } from "../../validations/EditCategory";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditCategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoriesId, setSelectedCategoriesId] = useState();
  const [formState, setFormState] = useState({
    name: undefined,
    time: undefined,
  });
  const [fetchCategories, setFetchCategories] = useState(false);
  const [error, setError] = useState();
  const [formErrors, setFormErrors] = useState({ name: "", time: "" });
  const [loader, setLoader] = useState(false);
  const [fetchCategoryLoader, setFetchCategoryLoader] = useState(false);
  const [updateCategoryLoader, setUpdateCategoryLoader] = useState(false);

  const menuInfo = useSelector((state) =>
    state.User.loginInfo.menuInfo ? state.User.loginInfo.menuInfo : ""
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
    async function getCategories() {
      try {
        setLoader(true);
        if (menuInfo._id) {
          let dataToBeSent = { menuId: menuInfo._id };
          let response = await FetchCategory(dataToBeSent);
          setCategories(response);
          setLoader(false);
        }
      } catch (error) {
        setLoader(false);
        setError(error.message);
      }
    }
    getCategories();
  }, [menuInfo._id, fetchCategories]);

  useEffect(() => {
    async function getCategoryInfoById() {
      try {
        setFetchCategoryLoader(true);
        let dataToBeSent = selectedCategoriesId;
        if (dataToBeSent) {
          let response = await FetchCategoryById(dataToBeSent);
          setFormState(response[0]);
          setFetchCategoryLoader(false);
          setFormErrors({ name: "", time: "" });
        }
        setFetchCategoryLoader(false);
      } catch (error) {
        setError(error.message);
        setFetchCategoryLoader(false);
      }
    }
    getCategoryInfoById();
  }, [selectedCategoriesId]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    let typedValue = value;
    if (!value) {
      typedValue = undefined;
    }
    setFormState({
      ...formState,
      [name]: typedValue,
    });
    setFormErrors({ name: "", time: "" });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("in edit");

    let userSelection = document.activeElement.value;

    try {
      if (userSelection === "edit") {
        setUpdateCategoryLoader(true);
        let dataToBeValidated = {
          name: formState.name,
          time: formState.time,
          _id: formState._id,
        };
        let formData = await editCategorySchema
          .validate(dataToBeValidated, {
            abortEarly: false,
          })
          .catch((err) => {
            for (let i = 0; i < err.inner.length; i++) {
              setFormErrors((prev) => ({
                ...prev,
                [err.inner[i].path]: err.inner[i].message,
              }));
            }
          });

        let dataToBeUpdated = {
          name: formData.name,
          time: formData.time,
          categoryId: formData._id,
        };
        let editCartegory = await UpdateCategory(dataToBeUpdated);
        setUpdateCategoryLoader(false);
        setSelectedCategoriesId(undefined);
        document.getElementById("categorySelect").selectedIndex = 0;
        setFetchCategories((prev) => !prev);
        notify(editCartegory.data.message);
      } else if (userSelection === "delete") {
        setUpdateCategoryLoader(true);
        let dataToBeValidated = {
          name: formState.name,
          time: formState.time,
          _id: formState._id,
        };
        let formData = await editCategorySchema
          .validate(dataToBeValidated, {
            abortEarly: false,
          })
          .catch((err) => {
            for (let i = 0; i < err.inner.length; i++) {
              setFormErrors((prev) => ({
                ...prev,
                [err.inner[i].path]: err.inner[i].message,
              }));
            }
          });

        let dataToBeSent = { categoryId: formData._id };

        let deleteCategory = await DeleteCategory(dataToBeSent);
        setUpdateCategoryLoader(false);
        setSelectedCategoriesId(undefined);
        document.getElementById("categorySelect").selectedIndex = 0;
        setFetchCategories((prev) => !prev);
        notify(deleteCategory.data.message);
      }
    } catch (error) {
      console.log(error.response.data.message);
      if (error.response.status === 405) {
        setUpdateCategoryLoader(false);
        setError(error.response.data.message);
      } else {
        setUpdateCategoryLoader(false);
        setError(error.message);
      }
    }
  };
  return (
    <div className="editCategoryWrapper">
      {loader ? (
        <div className="flex justify-center">
          <img className="w-16" src={spinner} alt="spinner" />
        </div>
      ) : (
        <div className="editCategoryContent">
          <div className="EditCategoryTitle text-center text-2xl font-semibold">
            Edit Categories
          </div>
          <div className="text-center font-medium mt-2">
            Please select a catgeory to start editing
          </div>
          <div className="editCategorySelect flex justify-start mt-2 text-sm pl-5">
            <div className="text-lg px-1">Category:</div>
            <select
              className="p-1 ml-2 text-lg px-2 outline-none"
              id="categorySelect"
              onChange={(e) => {
                setSelectedCategoriesId(e.target.value);
              }}
            >
              <option selected disabled>
                Select a category
              </option>
              {categories.map((element, index) => (
                <option key={index} value={element._id}>
                  {element.name}
                </option>
              ))}
            </select>
          </div>
          {fetchCategoryLoader ? (
            <div className="flex justify-center  pt-8">
              <img className="w-16" src={spinner} alt="spinner" />
            </div>
          ) : (
            <>
              <div className="editCategoryForm">
                {selectedCategoriesId === undefined ? (
                  ""
                ) : (
                  <form className="flex justify-center " onSubmit={onSubmit}>
                    <div className="editCategoryFormInputWrapper md:w-1/2 pt-6">
                      <div>
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="Name"
                        >
                          Name
                        </label>
                        <input
                          className=" appearance-none border 
            rounded w-full py-2 px-3 text-gray-700 
            leading-tight focus:outline-none
             focus:shadow-outline"
                          id="name"
                          type="text"
                          placeholder="Category Name"
                          value={formState.name}
                          name="name"
                          onInput={onChangeHandler}
                        />
                        <div
                          className="invalid-feedback  text-red-500 text-xs px-2 pt-1"
                          style={formErrors.name ? { display: "block" } : {}}
                        >
                          {formErrors.name}
                        </div>
                      </div>

                      <div className="pt-6">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="Name"
                        >
                          Time
                        </label>
                        <input
                          className=" appearance-none border 
            rounded w-full py-2 px-3 text-gray-700 
            leading-tight focus:outline-none
             focus:shadow-outline"
                          id="time"
                          name="time"
                          type="text"
                          placeholder="Category Time"
                          value={formState.time}
                          onInput={onChangeHandler}
                        />
                        <div
                          className="invalid-feedback  text-red-500 text-xs px-2 pt-1"
                          style={formErrors.time ? { display: "block" } : {}}
                        >
                          {formErrors.time}
                        </div>
                      </div>
                      {updateCategoryLoader ? (
                        <div className="flex justify-center">
                          <img className="w-16" src={spinner} alt="spinner" />
                        </div>
                      ) : (
                        <div className="flex justify-between pt-6  ">
                          <button
                            value="edit"
                            className="editCategoryBtn shadow-md mt-2 text-lg md:text-xl md:mt-4 lg:text-xl"
                          >
                            submit
                          </button>
                          <button
                            value="delete"
                            className="deleteCategoryBtn shadow-md mt-2  text-lg md:text-xl md:mt-4 lg:text-xl"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </form>
                )}
                {error ? (
                  <div className="text-center mt-2 mb-2 text-red-700">
                    {error}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </>
          )}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default EditCategory;
