import React, { useContext, useEffect } from "react";
import { AppContext } from "../../../appContext";

import Box from "@mui/material/Box";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";
import "./Sidebar.css";

function Sidebar({
  orders,
  isSidebarOpen,
  setIsSidebarOpen,
  toggleSidebar,
  selectedOrderId,
  setSelectedOrderId,
}) {
  const { setCurrentOrder } = useContext(AppContext);
  const iconsUrl = process.env.PUBLIC_URL + "/icons/";

  useEffect(() => {
    setIsSidebarOpen(false);
  }, []);

  return (
    <>
      <Box className={`sidebar-box ${isSidebarOpen ? "open" : ""}`}>
        <button className="sidebar-toggle-button" onClick={toggleSidebar}>
          {isSidebarOpen ? (
            <BsToggleOn size={25} color="#42224d" />
          ) : (
            <BsToggleOff size={25} color="#42224d" />
          )}
        </button>

        {isSidebarOpen && (
          <>
            {orders.length !== 0 ? (
              <>
                {orders.map((order) => (
                  <div
                    key={order.orderId}
                    onClick={() => {
                      setCurrentOrder(order);
                      setSelectedOrderId(order.orderId);
                    }}
                    className={`order-button-container ${
                      selectedOrderId === order.orderId
                        ? "order-button-container-selected"
                        : ""
                    }`}
                  >
                    <div>
                      <img
                        alt="Google"
                        src={iconsUrl + "tyre.svg"}
                        height={20}
                      />{" "}
                    </div>
                    <div className="order-button-results-container">
                      <div className="order-button-results-registration-number">
                        <span style={{ fontWeight: "bold" }}>
                          GB {order?.vehicleFreeData?.RegistrationNumber}
                        </span>
                      </div>
                      <div className="order-button-results-model">
                        {
                          order?.data?.VehicleAndMotHistory?.VehicleRegistration
                            ?.MakeModel
                        }
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </Box>
    </>
  );
}

export default Sidebar;
