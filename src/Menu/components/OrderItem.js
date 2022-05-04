import React from "react";
import "./OrderItem.css";

const OrderItem = ({ srNo, item }) => {
  return (
    <div className="px-2 py-4">
      <div className="flex justify-between">
        <div className="text-lg ">
          {srNo}. {item.name}
        </div>
        <div className="flex justify-evenly w-24">
          <div>{item.quantity}</div> x <div>{item.price}</div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
