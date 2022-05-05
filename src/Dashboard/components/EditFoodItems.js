import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { FetchCategory, FetchFoodItem } from "../menuActions";
import spinner from "../../assests/spinner.gif";
import Item from "./Item";
import EditFoodItemForm from "./EditFoodItemForm";

const EditFoodItems = () => {
  const menu = useSelector((state) =>
    state.User.loginInfo.menuInfo ? state.User.loginInfo.menuInfo : ""
  );
  const [category, setCategory] = useState();
  const [categoryError, setCategoryError] = useState();
  const [updateFoodItem, setUpdateFoodItems] = useState(false);
  const [categories, setCategories] = useState([]);
  const [foodItems, setFoodItems] = useState();
  const [editItem, setEditItem] = useState(false);
  const [editItemInfo, setEditItemInfo] = useState();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [emptyCategoryMessage, setEmptyCategoryMessage] = useState(undefined);

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
          setCategories(response);
        } else {
          setCategories("");
        }
      } catch (err) {
        setError(error.message);
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
          console.log(response);
          if (response) {
            setFoodItems({ data: response });
            setEmptyCategoryMessage(undefined);
            setLoader(false);
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
        setError(error.message);
      }
    })();
  }, [category, updateFoodItem]);
  return (
    <div className="editFoodItemWrapper">
      <div className="editFoodItemTitle text-center text-xl font-semibold">
        Edit Food Items
      </div>
      {editItem ? (
        <EditFoodItemForm
          itemInfo={editItemInfo}
          editItem={() => {
            setCategory("");
            setFoodItems("");
            setEditItem(false);
          }}
          popUpMessage={(val) => {
            notify(val);
          }}
        />
      ) : (
        <div className="editFoodItemContent">
          <div className="editFoodItemSelect flex justify-start mt-2 text-sm pl-5">
            <div className="text-lg px-1">Category:</div>
            <select
              className="p-1 ml-2 text-lg px-2 outline-none"
              id="categorySelect"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option selected disabled>
                Select a category
              </option>
              {categories
                ? categories.map((element, index) => (
                    <option key={index} value={element._id}>
                      {element.name}
                    </option>
                  ))
                : null}
            </select>
          </div>
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
                <div className="categoryContainer flex flex-wrap lg:block lg:w-9/12   lg:overflow-y-auto lg:px-0 px-10  mb-4 mt-2 ">
                  {foodItems
                    ? foodItems.data.map((item, index) => (
                        <Item
                          info={item}
                          key={index}
                          editable={true}
                          editItem={() => {
                            setEditItem(true);
                          }}
                          setFoodItemDisplayFalse={() => {
                            setFoodItems("");
                            setUpdateFoodItems((prev) => !prev);
                          }}
                          editItemInfo={(val) => {
                            setEditItemInfo(val);
                          }}
                          popUpMessage={(val) => {
                            notify(val);
                          }}
                        />
                      ))
                    : null}
                </div>
              )}
            </>
          )}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default EditFoodItems;
