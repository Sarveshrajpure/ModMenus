import React, { useState } from "react";
import DashboardLayout from "../Hoc/DashboardLayout";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [option, setOption] = useState();

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


        
      </DashboardLayout>
    </div>
  );
};

export default Dashboard;
