import React from "react";
import "./SummaryItem.css";
import OrderItem from "./OrderItem";

const SummaryItem = ({ item, srNo }) => {
  return (
    <div className="summaryItemBlock py-2 px-2 m-1 rounded">
      <div>{srNo}</div>
      <div className="">
        <div className="py-1 text-lg">
          Order for- <b>{item.guestName}</b>
        </div>
        <div className="py-1">
          At Table no- <b>{item.tableNumber}</b>
        </div>
      </div>
      <div>
        {item.items.map((element, index) => (
          <OrderItem key={index} item={element} srNo={index + 1} />
        ))}
      </div>
      <div className=" px-2 py-4 flex justify-between">
        <div className="text-xl font-semibold">Order Total</div>
        <div className="flex justify-evenly w-24">
          - <div>₹ {item.total} </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryItem;
