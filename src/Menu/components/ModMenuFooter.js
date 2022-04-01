import React from "react";
import mmLogo from "../../assests/mmLogoNoQr.svg";

const MenuFooter = () => {
  return (
    <div className="menuFooterWrapper p-2 mt-10 mb-10">
      <div className="menuFooterContent">
        <div className="menuFooterImage flex justify-center">
          <img src={mmLogo} alt="ModMenuLogo" />
        </div>
        <div className="redirectToWebsite text-center mt-5">
          Checkout our{" "}
          <u
            className=" decoration-1 cursor-pointer"
            onClick={() => {
              window.open("https://offdutyninjas.site");
            }}
          >
            website
          </u>{" "}
          for more info
        </div>
        <div className="text-center text-xs mt-5">
          Copyright © 2022 Off Duty Ninjas Technologies | All Rights Reserved
        </div>
      </div>
    </div>
  );
};

export default MenuFooter;
