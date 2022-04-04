import React, { useState, useEffect } from "react";
import DashboardLayout from "../Hoc/DashboardLayout";
import { useSelector } from "react-redux";
import { getMenu } from "./menuActions";

const Dashboard = () => {
  const [option, setOption] = useState();
  const [qr, setQr] = useState("");
  const menu = useSelector((state) =>
    state.User.loginInfo.user.firstname ? state.User.loginInfo.menuInfo : null
  );

  useEffect(() => {
    async function getQr() {
      try {
        if (menu.menuReference) {
          let response = await getMenu(menu.menuReference);
          console.log(response.data[0].menuData.qrLink);
          setQr(response.data[0].menuData.qrLink);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getQr();
  }, []);

  const user = useSelector((state) =>
    state.User.user_verification.user ? state.User.user_verification.user : null
  );

  function capitalizeFirstLetter(string) {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }

  return (
    <div className="dashboardWrapper">
      <DashboardLayout
        Title={"Overview"}
        setChoice={(val) => {
          setOption(val);
        }}
      >
        <p className="flex justify-center text-xl font-extrabold mt-20">
          Your Qr for viewing menu card
        </p>
        <div className="flex justify-center">
          <img src={qr} alt="qr code" />
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Dashboard;
