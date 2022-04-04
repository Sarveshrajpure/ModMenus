import React from "react";
import "./Item.css";

const Item = ({ info }) => {
  return (
    <div className="itemWrapper w-5/6 lg:w-1/4 my-2 mx-2  rounded ">
      <div className="itemDetailsBlock text-center py-2 ">
        <div className="nameDetail text-xl">Name: {info.name}</div>
        <div className="timeDetail text-sm">Time Slot: {info.description}</div>
      </div>
    </div>
  );
};

export default Item;
