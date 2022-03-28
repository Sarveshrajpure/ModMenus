import React from "react";
import FoodItems from "./FoodItems";
import "./Categories.css";

const Categories = ({ categoryData, foodItems }) => {
  return (
    <div className="categoryContainer p-2 ">
      <div className="text-xl font-extrabold ">{categoryData.name}</div>
      <hr className="categoryHr" />
      {foodItems.map((element, index) => {
        return <FoodItems key={index} itemData={element} />;
      })}
    </div>
  );
};

export default Categories;
