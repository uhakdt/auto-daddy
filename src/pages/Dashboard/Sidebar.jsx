import React, { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import "./Sidebar.css";
import CarSidebar from "../../SVGs/CarSidebar";

import { CheckOrderCriteria } from "../../auxiliaryFunctions/orderFunctions";

function Sidebar({ orders, onSelectOrder, onSelectSettings }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const [open, setOpen] = useState(matches);
  const toggleOpen = () => setOpen(!open);

  return (
    <Box className="sidebar-box">
      <IconButton onClick={toggleOpen} className="toggle-button">
        {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
      {orders.map((order) => (
        <IconButton
          key={order.id}
          onClick={() => {
            onSelectOrder(order.id);
            console.log(order);
          }}
          className="order-button"
        >
          <CarSidebar
            colour={CheckOrderCriteria(order) ? "#e8f653" : "#FF0000"}
          />
          <div
            style={{
              fontSize: "1rem",
            }}
          >
            {open && (order?.vehicleFreeData.RegistrationNumber || "N/A")}
          </div>
        </IconButton>
      ))}

      <IconButton onClick={onSelectSettings} className="settings-button">
        <SettingsIcon />
      </IconButton>
    </Box>
  );
}

export default Sidebar;
