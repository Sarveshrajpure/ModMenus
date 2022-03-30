import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Categories from "./components/Categories";
import { getMenu } from "./MenuActrions";
import spinnerGif from "../assests/spinner.gif";
import MenuFooter from "./components/ModMenuFooter";

const Menu = () => {
  const { menuReference } = useParams();
  const [menuData, setMenuData] = useState();
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    async function getMenuData() {
      try {
        setSpinner(true);
        const response = await getMenu(menuReference);
        setMenuData(response.data[0]);
        setSpinner(false);
      } catch (error) {
        setSpinner(false);
        console.log(error);
      }
    }
    getMenuData();
  }, [menuReference]);

  console.log(menuData ? menuData.menuData : "");
  return (
    <React.Fragment>
      {spinner ? (
        <div className="spinner h-screen relative flex justify-center">
          <img
            className="transform absolute top-2/4    w-20 "
            src={spinnerGif}
            alt="Loading"
          />
        </div>
      ) : (
        <div className="menuContainer  flex justify-center h-max  bg-slate-50 ">
          <div className="menuContent  justify-items-center h-max bg-white  lg:w-1/4 p-5">
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
            <MenuFooter />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Menu;
