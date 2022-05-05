import React from "react";
import OrderItem from "./OrderItem";
import "./Order.css";

const Order = ({ order }) => {
  console.log(order);
  return (
    <div>
      <div>
        {order.items.map((element, index) => {
          return <OrderItem key={index} item={element} srNo={index + 1} />;
        })}

        <div className=" px-2 py-4 flex justify-between">
          <div className="text-xl font-semibold">Order Total</div>
          <div className="flex justify-evenly w-24">
            - <div>₹ {order.total} </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
