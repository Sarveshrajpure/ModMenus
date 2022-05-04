import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchOrdersByBusinessId } from "../menuActions";
import io from "socket.io-client";
import Orders from "./orders";
import "./dashboardHome.css";

const DashboardHome = () => {
  const businessId = useSelector((state) =>
    state.User.user_verification.user.firstname
      ? state.User.user_verification.user._id
      : null
  );

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        if (businessId) {
          let dataToBeSent = {
            businessId: businessId,
          };
          let response = await fetchOrdersByBusinessId(dataToBeSent);
          setOrders(response.data);
        }
      } catch (error) {}
    }
    fetchOrders();
  }, []);

  useEffect(() => {
    const socket = io("localhost:3001/api/socket");
    socket.on("newOrder", async (newOrder) => {
      if (newOrder.businessId === businessId) {
        let dataToBeSent = {
          businessId: businessId,
        };
        let response = await fetchOrdersByBusinessId(dataToBeSent);
        setOrders(response.data);
      }
    });
  }, []);

  console.log(orders);
  return (
    <div className="dashboardHomeWrapper p-2">
      <div className="font-semibold text-2xl">Active Orders :-</div>
      <div className="ordersWrapper flex flex-col items-center lg:w-6/12 overflow-y-scroll">
        {orders.map((item, index) => (
          <Orders key={index} orderInfo={item} />
        ))}
      </div>
      <div className="StatisticsWrapper"></div>
    </div>
  );
};

export default DashboardHome;
