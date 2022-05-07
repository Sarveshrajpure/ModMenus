import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchOrdersByBusinessId, fetchStatistics } from "../menuActions";
import io from "socket.io-client";
import Orders from "./orders";
import "./dashboardHome.css";
import CountUp from "react-countup";

const DashboardHome = () => {
  const businessId = useSelector((state) =>
    state.User.user_verification.user.firstname
      ? state.User.user_verification.user._id
      : null
  );
  const qrLink = useSelector((state) =>
    state.User.loginInfo.menuInfo.name
      ? state.User.loginInfo.menuInfo.qrLink
      : null
  );

  const [orders, setOrders] = useState([]);
  const [statistics, setStatistics] = useState();

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
    const socket = io("https://localhost:3001/api/socket");
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
  useEffect(() => {
    async function getStatistics() {
      try {
        let dataToBeSent = { businessId: businessId };

        let response = await fetchStatistics(dataToBeSent);
        console.log(response);
        setStatistics(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getStatistics();
  }, []);

  const downloadQr = async () => {
    const image = await fetch(qrLink);
    const imageBlob = await image.blob();
    const imageUrl = URL.createObjectURL(imageBlob);

    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "Menu_qr";
    link.click();
    document.body.removeChild(link);
  };

  console.log(orders);
  return (
    <div className="dashboardHomeWrapper p-2 lg:flex ">
      <div className="dashHomeLeftWrapper lg:w-6/12">
        <div className="activeOrdersWrapper">
          <div className="activeOrdersTitle text-center font-semibold text-2xl">
            Active Orders
          </div>
          <div className="mt-1 mb-1 text-center font-semibold">
            Total Orders: {orders.length}
          </div>
          <div className="ordersWrapper flex flex-col items-center  overflow-y-scroll">
            {orders.map((item, index) => (
              <Orders key={index} orderInfo={item} />
            ))}
          </div>
        </div>
      </div>
      <div className="dashHomeRigthWrapper lg:w-6/12">
        <div className="statisticsWrapper">
          <div className="statisticsTitle text-center font-semibold text-2xl mt-4 lg:mt-0">
            Statistics
          </div>
          <div className="statisticsContent p-2">
            <div className="flex">
              <div className="statisticsItemWrapper m-4 text-2xl bg-white w-2/4 text-center p-2 rounded font-semibold ">
                <CountUp end={statistics ? statistics.uniqueCust : 0} />
                <div className="statisticsItemTitle font-medium mt-1 text-xl">
                  Unique customers
                </div>
              </div>
              <div className="statisticsItemWrapper m-4 text-2xl bg-white w-2/4 text-center p-2 rounded font-semibold">
                <CountUp
                  end={statistics ? statistics.orderStats.totalRevenue : 0}
                  prefix={"₹"}
                />
                <div className="statisticsItemTitle font-medium mt-1 text-xl">
                  Total revenue
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="statisticsItemWrapper m-4 text-2xl bg-white w-2/4 text-center p-2 rounded font-semibold">
                <CountUp
                  end={statistics ? statistics.orderStats.servedOrders : 0}
                />
                <div className="statisticsItemTitle font-medium mt-1 text-xl">
                  Orders served
                </div>
              </div>
              <div className="statisticsItemWrapper m-4 text-2xl bg-white w-2/4 text-center p-2 rounded font-semibold">
                <CountUp
                  end={statistics ? statistics.orderStats.activeOrders : 0}
                />
                <div className="statisticsItemTitle font-medium mt-1 text-xl">
                  Active Orders
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="viewMenuWrapper">
          <div className="viewMenuContent p-2 ">
            <div className="viewMenuTitle text-center font-semibold text-2xl mt-4 lg:mt-0">
              Qr for your menu
            </div>
            <div className="QrDisplays flex justify-center mt-2">
              <img className="qrImageTag" src={qrLink} alt="QrImage" />
            </div>
            {qrLink ? (
              <div className=" flex justify-center mt-2">
                <div
                  className="qrImageDownloadBtn"
                  onClick={() => {
                    downloadQr();
                  }}
                >
                  Download qr
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
