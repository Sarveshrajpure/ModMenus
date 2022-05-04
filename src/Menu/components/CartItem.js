import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { add_to_cart } from "../../Actions/guestActions";
import { addToCart } from "../MenuActrions";
import "./CartItem.css";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const guest = useSelector((state) =>
    state.Guest.data.name ? state.Guest.data : ""
  );

  const handleMinus = async (itemData) => {
    let cartTemp = guest.cart;
    console.log(itemData);
    const exist = cartTemp.find((x) => x.id === itemData.id);
    console.log("exist", exist);
    if (exist) {
      cartTemp.map((x) =>
        x.id === itemData.id && x.quantity >= 1
          ? {
              name: itemData.name,
              price: itemData.price,
              id: itemData.id,
              quantity: x.quantity--,
            }
          : x
      );

      for (let i = 0; i < cartTemp.length; i++) {
        if (cartTemp[i].id === itemData.id && cartTemp[i].quantity === 0) {
          cartTemp.splice(i, 1);
        }
      }
    }

    let payload = { ...guest, cart: cartTemp };

    dispatch(add_to_cart(payload));

    let response = await addToCart(guest._id, guest.cart);
    if (response) {
      window.location.reload();
    }
  };

  const handlePlus = async (itemData) => {
    let cartTemp = guest.cart;
    console.log(itemData);
    const exist = cartTemp.find((x) => x.id === itemData.id);
    console.log("exist", exist);
    if (exist) {
      cartTemp.map((x) =>
        x.id === itemData.id && x.quantity >= 1
          ? {
              name: itemData.name,
              price: itemData.price,
              id: itemData.id,
              quantity: x.quantity <= 10 ? x.quantity++ : x.quantity,
            }
          : x
      );

      for (let i = 0; i < cartTemp.length; i++) {
        if (cartTemp[i].id === itemData.id && cartTemp[i].quantity === 0) {
          cartTemp.splice(i, 1);
        }
      }
    }

    let payload = { ...guest, cart: cartTemp };

    dispatch(add_to_cart(payload));

    let response = await addToCart(guest._id, guest.cart);
    if (response) {
      window.location.reload();
    }
  };

  return (
    <div className="px-2 py-4">
      <div className="flex justify-between">
        <div className="text-lg ">{item.name}</div>
        <div className="flex justify-evenly w-40">
          <div className="quantityBlock flex justify-evenly  w-full ">
            <div
              className="quantityActionBtn px-2 py-1 "
              onClick={() => {
                handleMinus(item);
              }}
            >
              <i class="fa-solid fa-minus"></i>
            </div>
            <div className="text-xl"> {item.quantity}</div>
            <div
              className="quantityActionBtn px-2 py-1"
              onClick={() => {
                handlePlus(item);
              }}
            >
              <i class="fa-solid fa-plus"></i>
            </div>
          </div>
          x <div> &nbsp;{item.price}</div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
