import React from "react";
import FoodItems from "./FoodItems";
import "./Categories.css";

const Categories = ({ categoryData, foodItems }) => {
  console.log(categoryData);
  return (
    <div className="menuCategoryContainer p-2 ">
      <div className="text-xl font-extrabold flex justify-between ">
        <div>{categoryData.name}</div>
        <div className="text-sm">{categoryData.time}</div>
      </div>
      <hr className="categoryHr" />
      {foodItems.map((element, index) => {
        return <FoodItems key={index} itemData={element} />;
      })}
    </div>
  );
};

export default Categories;
