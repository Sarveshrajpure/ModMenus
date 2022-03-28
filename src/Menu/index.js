import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Categories from "./components/Categories";
import { getMenu } from "./MenuActrions";

const Menu = () => {
  const { menuReference } = useParams();
  const [menuData, setMenuData] = useState();

  useEffect(() => {
    async function getMenuData() {
      try {
        const response = await getMenu(menuReference);
        setMenuData(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    }
    getMenuData();
  }, [menuReference]);

  console.log(menuData ? menuData.menuData : "");
  return (
    <div className="menuContainer  flex justify-center h-max  bg-slate-50 ">
      <div className="menuContent  justify-items-center h-screen bg-white  lg:w-1/4 p-5">
        <div className="businessInfo p-2 bg-black text-4xl  text-white rounded">
          {menuData ? menuData.menuData.businessName : ""}'s Menu
        </div>
        {menuData
          ? menuData.categoryAndFoodItemData.map((element, index) => {
              return (
                <Categories
                  key={index}
                  categoryData={element.categoriesData}
                  foodItems={element.foodItemData}
                />
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default Menu;
