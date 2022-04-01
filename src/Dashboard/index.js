import React from "react";
import DashboardLayout from "../Hoc/DashboardLayout";

const Dashboard = () => {
  return (
    <div className="dashboardWrapper">
      <DashboardLayout title="Overview">
        <div>user dashborad</div>
      </DashboardLayout>
    </div>
  );
};

export default Dashboard;
