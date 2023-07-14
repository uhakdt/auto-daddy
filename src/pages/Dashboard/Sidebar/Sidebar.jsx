import React, { useState } from "react";

import { CapitalizeEachWord } from "../../../auxiliaryFunctions/stringFunctions";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import { TbReportAnalytics } from "react-icons/tb";

import "./Sidebar.css";

function Sidebar({ orders, onSelectOrder, onSelectSettings }) {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOrderSelect = (id) => {
    onSelectOrder(id);
    setSelectedOrder(id);
  };

  return (
    <Box className="sidebar-box">
      <div className="new-search-button-container">
        <button type="submit" className="new-search-button">
          New Search
        </button>
      </div>
      {orders.map((order) => (
        <div
          key={order.id}
          onClick={() => {
            handleOrderSelect(order.id);
          }}
          className={`order-button-container ${
            selectedOrder === order.id ? "order-button-container-selected" : ""
          }`}
        >
          <div>
            <TbReportAnalytics size={25} color="#42224d" />
          </div>
          <div className="order-button-results-container">
            <div className="order-button-results-registration-number">
              <span style={{ fontWeight: "bold" }}>GB</span>{" "}
              <span>{order?.vehicleFreeData.RegistrationNumber}</span>
            </div>
            <div className="order-button-results-model">
              {CapitalizeEachWord(
                order?.data.VehicleAndMotHistory.VehicleRegistration.MakeModel
              )}
            </div>
          </div>
        </div>
      ))}

      <IconButton onClick={onSelectSettings} className="settings-button">
        <SettingsIcon />
      </IconButton>
    </Box>
  );
}

export default Sidebar;
