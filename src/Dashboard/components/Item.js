import React, { useEffect, useState } from "react";
import "./Item.css";
import spinner from "../../assests/spinner.gif";
import { DeleteFoodItem } from "../menuActions";

const Item = ({
  info,
  editable,
  editItem,
  editItemInfo,
  popUpMessage,
  setFoodItemDisplayFalse,
}) => {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState();

  const deleteFoodItem = async () => {
    try {
      setLoader(true);
      let dataToBeSent = { foodItemId: info._id };
      let response = await DeleteFoodItem(dataToBeSent);
      setLoader(false);
      popUpMessage(response.data.message);
      setFoodItemDisplayFalse();
    } catch (e) {
      setError(error.message);
    }
  };
  return (
    <div className="itemWrapper w-full my-2 mx-2 lg:mx-0 rounded p-2">
      <div className="itemDetailsBlock  py-2  ">
        <div className="nameDetail text-xl text-center">{info.name}</div>

        <div className="decriptionDetail text-xs py-1 px-2 ">
          Description: {info.description}
        </div>
        <div className="decriptionDetail text-sm py-1 px-2">
          Price: ₹ {info.price}
        </div>
        {editable === true ? (
          <>
            {loader ? (
              <div className="flex justify-center">
                <img className="w-16" src={spinner} alt="spinner" />
              </div>
            ) : (
              <div className="foodItemEditBtn flex justify-around w-full">
                <button
                  className="itemEditBtn  shadow-md  text-lg   md:text-lg md:mt-4  lg:text-lg"
                  onClick={() => {
                    editItemInfo(info);
                    editItem();
                  }}
                >
                  Edit
                </button>
                <button
                  className="itemDeleteBtn  shadow-md  text-sm   md:text-lg md:mt-4  lg:text-lg"
                  onClick={() => {
                    deleteFoodItem();
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </>
        ) : (
          ""
        )}
        {error ? (
          <div className="text-center mt-2 mb-2 text-red-700">{error}</div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Item;
