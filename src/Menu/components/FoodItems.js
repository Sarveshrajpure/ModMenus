import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../MenuActrions";
import { add_to_cart } from "../../Actions/guestActions";
import "./FoodItems.css";

const FoodItems = ({ itemData }) => {
  const dispatch = useDispatch();
  let Isimage = itemData.image;

  const guest = useSelector((state) =>
    state.Guest.data.name ? state.Guest.data : ""
  );

  const handleAddToCart = async (itemData) => {
    let cartTemp = guest.cart;

    const exist = cartTemp.find((x) => x.id === itemData._id);

    if (exist) {
      cartTemp.map((x) =>
        x.id === itemData._id
          ? {
              name: itemData.name,
              price: itemData.price,
              id: itemData._id,
              quantity: x.quantity++,
            }
          : x
      );
    } else {
      cartTemp.push({
        name: itemData.name,
        price: itemData.price,
        id: itemData._id,
        quantity: 1,
      });
    }

    let payload = { ...guest, cart: cartTemp };

    dispatch(add_to_cart(payload));

    let response = await addToCart(guest._id, guest.cart);
  };

  return (
    <React.Fragment>
      {Isimage ? (
        <>
          <div className="foodItemContainer h-40 flex  mb-2 rounded">
            <div className="foodItemImg w-3/6 ">
              <img
                className="foodItemImgtag py-1 pl-1 "
                src={Isimage}
                alt="Food-item"
              />
            </div>
            <div className=" foodItemContent  w-3/6 p-2 pl-1">
              <div className="h-4/5">
                <div className="foodItemName text-md font-semibold pl-2 pt-1">
                  {itemData.name}
                </div>
                <p className="foodItemDescription text-xs text-left ml-2  ">
                  {itemData.description}
                </p>
              </div>

              <div className="flex justify-between">
                <div className="fooditemPrice text-xs font-semibold p-1">
                  ₹{itemData.price}
                </div>
                <div
                  className="addTocartBtn text-xs font-semibold p-1 rounded "
                  onClick={() => {
                    handleAddToCart(itemData);
                  }}
                >
                  ADD &nbsp;
                  <i class="fa-solid fa-plus"></i>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="foodItemContainer h-22 flex  mb-2 rounded ">
            <div className=" foodItemContent  p-2 w-full">
              <div className="flex justify-between">
                <div className="foodItemName text-md font-semibold pl-2 pt-1">
                  {itemData.name}
                </div>
                <div className="fooditemPrice text-xs font-semibold p-2">
                  ₹{itemData.price}
                </div>
              </div>
              <p className="foodItemDescription text-xs text-left ml-2  ">
                {itemData.description}
              </p>
              <div className="flex justify-end py-2">
                <div
                  className="addTocartBtn text-xs font-semibold p-1 rounded "
                  onClick={() => {
                    handleAddToCart(itemData);
                  }}
                >
                  ADD &nbsp;
                  <i class="fa-solid fa-plus"></i>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </React.Fragment>
  );
};

export default FoodItems;
