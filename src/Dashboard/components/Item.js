import React from "react";
import "./Item.css";

const Item = ({ info }) => {
  return (
    <div className="itemWrapper w-10/12 lg:w-full my-2 mx-2 lg:mx-0 rounded ">
      <div className="itemDetailsBlock  py-2  ">
        <div className="nameDetail text-xl text-center">{info.name}</div>
        <div className="decriptionDetail text-xs py-1 px-2 ">
          Description: {info.description}
        </div>
        <div className="decriptionDetail text-sm py-1 px-2">
          Price: ₹ {info.price}
        </div>
      </div>
    </div>
  );
};

export default Item;
