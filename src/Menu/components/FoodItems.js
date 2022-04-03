import React from "react";
import "./FoodItems.css";

const FoodItems = ({ itemData }) => {
  let Isimage = itemData.image;
  console.log(Isimage.length);
  return (
    <React.Fragment>
      {Isimage ? (
        <>
          <div className="foodItemContainer h-40 flex  mb-2 rounded">
            <div className="foodItemImg w-3/5 ">
              <img
                className="foodItemImgtag  rounded-l"
                src={Isimage}
                alt="Food-item"
              />
            </div>
            <div className=" foodItemContent  w-3/5 p-2 pl-1">
              <div className="h-4/5">
                <div className="foodItemName text-md font-semibold pl-2 pt-1">
                  {itemData.name}
                </div>
                <p className="foodItemDescription text-xs text-left ml-2  ">
                  {itemData.description}
                </p>
              </div>

              <div className="fooditemPrice text-xs font-semibold p-2">$20</div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="foodItemContainer h-20 flex  mb-2 rounded">
            <div className=" foodItemContent  p-2">
              <div className="flex justify-between">
                <div className="foodItemName text-md font-semibold pl-2 pt-1">
                  {itemData.name}
                </div>
                <div className="fooditemPrice text-xs font-semibold p-2">
                  $20
                </div>
              </div>
              <p className="foodItemDescription text-xs text-left ml-2  ">
                {itemData.description}
              </p>
            </div>
          </div>
        </>
      )}
    </React.Fragment>
  );
};

export default FoodItems;
