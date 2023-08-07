import React, { useState, useEffect, useContext } from "react";

import { getOrdersByUserId } from "../../auxiliaryFunctions/firebaseDbQueries";
import { auth } from "../../firebase";

import { AppContext } from "../../appContext";

import Box from "@mui/material/Box";
import CarLoader from "../../SVGs/CarLoader";
import "./DashboardPage.css";

import Sidebar from "./Sidebar/Sidebar";
import OrderDetails from "./OrderDetails";
import Settings from "./Settings/Settings";
import Header from "./Header/Header";
import { Style } from "@mui/icons-material";
import Chat from "./Chat/Chat";

function DashboardPage() {
  const {
    setPreviousPage,
    setVehicleFreeData,
    currentOrder,
    setCurrentOrder,
    setOrders,
  } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    setPreviousPage(false);
    setVehicleFreeData(undefined);

    const getOrders = async () => {
      const user = auth.currentUser;
      if (user) {
        const ordersList = await getOrdersByUserId(user.uid);

        setOrders(ordersList);
        if (ordersList.length > 0) {
          setCurrentOrder(ordersList[0]);
        }
      }
      setIsLoading(false);
    };

    getOrders();
  }, []);

  if (isLoading) {
    return (
      <div className="loader">
        <CarLoader />
      </div>
    );
  }

  return (
    <Box
      className="dashboard"
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <Header />
      <Box className="dashboard-content" sx={{ display: "flex", flex: "1" }}>
        <Sidebar
          className="sidebar"
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        {currentOrder && <OrderDetails className="order-details" />}
      </Box>
      <Chat />
    </Box>
  );
}

export default DashboardPage;
