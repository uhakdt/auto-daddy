import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../../appContext";

import { CapitalizeEachWord } from "../../../auxiliaryFunctions/stringFunctions";

import Box from "@mui/material/Box";
import { TbReportAnalytics } from "react-icons/tb";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";
import "./Sidebar.css";
import GradientLine from "../../../designComponents/GradientLine";

function Sidebar({
  orders,
  isSidebarOpen,
  setIsSidebarOpen,
  toggleSidebar,
  selectedOrderId,
  setSelectedOrderId,
}) {

  const { setCurrentOrder } = useContext(AppContext);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const handleOrderClick = (order) => {
    setCurrentOrder(order);
    setSelectedOrder(order.orderId);
  };
  const iconsUrl = process.env.PUBLIC_URL + "/icons/";

  useEffect(() => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, []);

  return (
    <>
      <GradientLine />
      <Box className="sidebar-box">

        <button className="sidebar-toggle-button" onClick={toggleSidebar}>
          {isSidebarOpen ? (
            <BsToggleOn size={25} color="#42224d" />
          ) : (
            <BsToggleOff size={25} color="#42224d" />
          )}
        </button>

        {isSidebarOpen && (
          <>
            {/*<div className="new-search-button-container">
            <button type="submit" className="new-search-button">
              New Search
            </button>
          </div> */}
            {orders.length !== 0 ? (
              <>
                {orders.map((order) => (
                  <div
                    key={order.orderId}
                    onClick={() => {
                      setCurrentOrder(order);
                      setSelectedOrderId(order.orderId); // Update the selected order ID
                    }}
                    className={`order-button-container ${selectedOrderId === order.orderId
                      ? "order-button-container-selected"
                      : ""
                      }`}
                  >
                    <div>
                      <img alt="Google" src={iconsUrl + "tyre.svg"} height={20} />{" "}
                    </div>
                    <div className="order-button-results-container">
                      <div className="order-button-results-registration-number">
                        <span style={{ fontWeight: "bold" }}>
                          GB {order?.vehicleFreeData.RegistrationNumber}
                        </span>
                      </div>
                      <div className="order-button-results-model">
                        {CapitalizeEachWord(
                          order?.data.VehicleAndMotHistory.VehicleRegistration
                            .MakeModel
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <></>
            )}
            {/* <IconButton onClick={onSelectSettings} className="settings-button">
            <SettingsIcon />
          </IconButton> */}
          </>
        )}
      </Box>
    </>
  );
}

export default Sidebar;
