import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getActiveOrders } from "../MenuActrions";
import { useNavigate } from "react-router-dom";
import spinnerGif from "../../assests/spinner.gif";
import SummaryItem from "./SummaryItem";
import "./OrderSummary.css";

const OrderSummary = () => {
  const guest = useSelector((state) =>
    state.Guest.data.name ? state.Guest.data : ""
  );
  const [data, setData] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      setSpinner(true);
      const getInfo = async () => {
        let response = await getActiveOrders({
          id: guest._id,
        });
        if (response.data) {
          setData(response.data);
          setSpinner(false);
        }
      };

      getInfo();
    } catch (err) {
      console.log(err);
      setSpinner(false);
    }
  }, [guest._id, setData]);
  return (
    <div className="p-2">
      {spinner ? (
        <div className="spinner h-screen relative flex justify-center">
          <img
            className="transform absolute top-2/4    w-20 "
            src={spinnerGif}
            alt="Loading"
          />
        </div>
      ) : (
        <>
          <div className="businessInfo p-2 bg-black text-4xl  text-white rounded">
            <div className="text-lg text-center">Orders Summary</div>
          </div>
          <div className="text-xl font-extrabold flex justify-between px-2 py-2">
            <div
              onClick={() => {
                navigate(-1);
              }}
            >
              <i class="fa-solid fa-left-long"></i>
            </div>

            <div className="text-sm py-1">
              {data.length} {data.length > 1 ? "Orders" : "Order"}
            </div>
          </div>
          <div>
            {data.map((element, index) => (
              <SummaryItem key={index} item={element} srNo={index + 1} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default OrderSummary;
