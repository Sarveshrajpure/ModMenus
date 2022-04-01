import React, { useState } from "react";
import DashboardLayout from "../Hoc/DashboardLayout";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [option, setOption] = useState();

  // const user = useSelector((state) =>
  //   state.Login_Register_Info.loginInfo
  //     ? state.Login_Register_Info.loginInfo.email
  //     : null
  // );
  return (
    <div className="dashboardWrapper">
      <DashboardLayout
        Title={"Overview"}
        setChoice={(val) => {
          setOption(val);
        }}
      ></DashboardLayout>
    </div>
  );
};

export default Dashboard;
