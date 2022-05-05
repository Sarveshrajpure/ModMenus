import React, { useState, useEffect } from "react";
import CartItem from "./CartItem";
import Order from "./Order";
import MenuFooter from "./ModMenuFooter";
import { useNavigate } from "react-router-dom";
import { getCart, order } from "../MenuActrions";
import { useSelector, useDispatch } from "react-redux";
import { add_to_cart } from "../../Actions/guestActions";
import spinnerGif from "../../assests/spinner.gif";
import tick from "../../assests/tick.gif";
import "./Cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [cartTotal, setCartTotal] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState([]);
  const guest = useSelector((state) =>
    state.Guest.data.name ? state.Guest.data : ""
  );

  useEffect(() => {
    try {
      setSpinner(true);
      const getInfo = async () => {
        let response = await getCart({
          id: guest._id,
        });
        if (response.cart) {
          setData(response.cart);
          setSpinner(false);
        }
      };

      getInfo();
    } catch (err) {
      console.log(err);
      setSpinner(false);
    }
  }, [guest._id, setData]);

  useEffect(() => {
    const calcTotal = () => {
      let total = 0;

      for (let i = 0; i < data.length; i++) {
        total = total + data[i].quantity * data[i].price;
      }

      setCartTotal(total);
    };
    calcTotal();
  }, [data]);

  const calcTQuantity = () => {
    let TQ = 0;

    TQ = data.length;

    return TQ;
  };

  const handlePlaceOrder = async () => {
    try {
      let orderData = {
        businessId: guest.businessId,
        guestId: guest._id,
        guestName: guest.name,
        tableNumber: guest.table,
        items: data,
        total: cartTotal.toString(),
        status: "placed",
      };
      const response = await order(orderData);
      if (response) {
        console.log("order placed", response);
        let payload = { ...guest, cart: [] };

        dispatch(add_to_cart(payload));
        setData([]);
        setOrderPlaced(response.order);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleOrderSummary = () => {
    navigate(-1);
  };

  return (
    <div className="menuCategoryContainer p-2 ">
      {spinner ? (
        <div className="spinner h-screen relative flex justify-center">
          <img
            className="transform absolute top-2/4    w-20 "
            src={spinnerGif}
            alt="Loading"
          />
        </div>
      ) : (
        <div>
          <div className="businessInfo p-2 bg-black text-4xl  text-white rounded">
            <div className="text-lg text-center">{guest.name}'s Cart</div>
          </div>
          {calcTQuantity() > 0 ? (
            <>
              <div className="text-xl font-extrabold flex justify-between px-1 cursor-pointer">
                <div
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  <i class="fa-solid fa-left-long"></i>
                </div>

                <div className="text-sm py-1">
                  {calcTQuantity()} {calcTQuantity() > 1 ? "Items" : "Item"}
                </div>
              </div>

              <hr className="categoryHr" />
            </>
          ) : (
            <>
              {orderPlaced.items ? (
                <>
                  <div className="text-lg text-center py-2"> Your Order </div>
                  <hr className="categoryHr" />
                </>
              ) : (
                <div className="text-xl  px-2 py-2 font-bold">
                  <div
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    <i class="fa-solid fa-left-long"></i>
                  </div>
                  <div className="py-48 text-center text-lg">
                    {" "}
                    Your Cart is Empty, add items to place order{" "}
                  </div>
                </div>
              )}
            </>
          )}

          {data.map((element, index) => {
            return <CartItem key={index} item={element} />;
          })}
          {data[0] ? (
            <>
              <div className=" px-2 py-4 flex justify-between">
                <div className="text-xl font-semibold">Total</div>
                <div className="flex justify-evenly w-24">
                  - <div>₹ {cartTotal} </div>
                </div>
              </div>

              <div
                className="orderBtn    my-8   text-2xl text-center py-2   "
                onClick={() => {
                  handlePlaceOrder();
                }}
              >
                {spinner ? (
                  <div className="spinner h-screen relative flex justify-center">
                    <img
                      className="transform absolute top-2/4    w-20 "
                      src={spinnerGif}
                      alt="Loading"
                    />
                  </div>
                ) : (
                  "Place Order"
                )}
              </div>
            </>
          ) : (
            ""
          )}

          {orderPlaced.items ? (
            <div>
              <Order order={orderPlaced} />
              <div className="flex justify-center">
                <img className=" w-64  " src={tick} alt="Success" />
              </div>
              <div className="text-sm text-center font-bold py-4">
                Sit tight your food is being prepared!
              </div>
              <div
                className="orderBtn relative text-2xl text-center py-2   "
                onClick={() => {
                  handleOrderSummary();
                }}
              >
                OK
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
      <MenuFooter />
    </div>
  );
};

export default Cart;
