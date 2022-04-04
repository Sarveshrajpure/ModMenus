import React from "react";
import "./Category.css";

const Category = ({ info }) => {
  return (
    <div className="categoryWrapper w-5/6 lg:w-1/4 my-2 mx-2  rounded ">
      <div className="categoryDetailsBlock text-center py-2 ">
        <div className="nameDetail text-xl">Name: {info.name}</div>
        <div className="timeDetail text-sm">Time Slot: {info.time}</div>
      </div>
    </div>
  );
};

export default Category;