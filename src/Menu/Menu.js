import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Categories from "./components/Categories";
import { getMenu } from "./MenuActrions";
import spinnerGif from "../assests/spinner.gif";
import CustomerRegisterModal from "./components/CustomerRegisterModal";
import { getCart } from "./MenuActrions";
import { useSelector } from "react-redux";

const Menu = () => {
  const { menuReference } = useParams();
  const [menuData, setMenuData] = useState();
  const [spinner, setSpinner] = useState(false);
  const [custRegisterModal, setCustRegisterModal] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [cartCount, setCount] = useState([]);
  const guest = useSelector((state) =>
    state.Guest.data.name ? state.Guest.data : ""
  );

  const guestCart = useSelector((state) =>
    state.Guest.data.name ? state.Guest.data.cart : ""
  );

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
    if (document.cookie.indexOf("ModMenus_Register_modal_shown") >= 0) {
    } else {
      setCustRegisterModal(true);
    }

    getMenuData();
  }, [menuReference]);

  useEffect(() => {
    async function getCartData() {
      try {
        let response = await getCart({ id: guest._id });

        setCartData(response.cart);
      } catch (error) {
        setSpinner(false);
        console.log(error);
      }
    }
    let TQ = 0;
    TQ = guestCart.length;
    setCount(TQ);
    getCartData();
  }, [guest._id, guest.cart, guestCart.length]);

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
            {custRegisterModal ? (
              <CustomerRegisterModal
                businessInfo={menuData}
                closeModal={() => {
                  setCustRegisterModal(false);
                }}
              />
            ) : (
              ""
            )}

            <div className="businessInfo p-2 bg-black text-4xl  text-white rounded">
              {menuData ? (
                <div>{menuData.menuData.businessName} 's Menu</div>
              ) : (
                ""
              )}
            </div>

            <div className="goToCartBtn flex pt-2 px-2">
              <div>Hi {guest.name}!</div>

              <Link to={"/menus/cart"}>
                <div className="flex ">
                  <div>
                    <i class="fa-solid fa-cart-shopping"></i>
                  </div>
                  <div className="cartQuantityBlock text-sm text-center">
                    {cartCount}
                  </div>
                </div>
              </Link>
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
      )}
    </React.Fragment>
  );
};

export default Menu;
