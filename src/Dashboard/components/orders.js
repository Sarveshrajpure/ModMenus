import React, { useState } from "react";
import "./orders.css";
import { updateOrderStatus } from "../menuActions";

const Orders = ({ orderInfo, setClearOrder }) => {
  const [loader, setLoader] = useState(false);
  const UpdateOrder = async () => {
    try {
      setLoader(true);
      let dataToBeSent = { orderId: orderInfo._id };
      let response = await updateOrderStatus(dataToBeSent);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="orderCardWrapper p-4 bg-white w-9/12 rounded mt-2">
      <div className="orderCardContent ">
        <div className="orderCardTableDisplay text-center font-semibold text-xl">
          Table Number: {orderInfo.tableNumber}
        </div>
        <div className="orderCardGuestNameDisplay mt-2 font-semibold text-lg text-gray-500 ">
          Guest name:&nbsp;
          <span className="text-base text-black font-medium">
            {orderInfo.guestName}
          </span>
        </div>
        <div className="orderCardItems ">
          <div className="orderCardItemsWrapper">
            <div className="text-base lg:text-base md:text-base font-semibold mt-2 text-gray-500">
              Items:
            </div>
            {orderInfo.items.map((item, index) => (
              <>
                <div
                  key={index}
                  className="orderCardItem text-base lg:text-lg md:text-lg font-semibold mt-1"
                >
                  {index + 1}. {item.name}
                </div>
                <div className="orderCarditemQuantity text-base lg:text-base md:text-base  font-semibold mt-1 text-gray-500 ">
                  Quantity:&nbsp;
                  <span className="orderCardItem text-base lg:text-lg md:text-lg">
                    {item.quantity}
                  </span>
                </div>
              </>
            ))}
          </div>

          <div className="orderCardTotalDisplay mt-2 font-semibold text-gray-500">
            Order total: &#8377;
            <span className="font-medium text-black "> {orderInfo.total}</span>
          </div>
        </div>
        <div
          className="orderCardClearBtn flex justify-center mt-2 mb-2 cursor-pointer"
          onClick={() => {
            UpdateOrder();
            window.location.reload();
          }}
        >
          Clear
        </div>
      </div>
    </div>
  );
};

export default Orders;
