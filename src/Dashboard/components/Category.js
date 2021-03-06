import React from "react";
import "./Category.css";

const Category = ({ info }) => {
  return (
    <div className="categoryWrapper w-full  my-2 mx-2 lg:mx-0  rounded ">
      <div className="categoryDetailsBlock text-center py-2 ">
        <div className="nameDetail text-xl">{info.name}</div>
        <div className="timeDetail text-sm">Time Slot: {info.time}</div>
      </div>
    </div>
  );
};

export default Category;
