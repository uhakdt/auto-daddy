import React, { useState, useEffect, useContext } from "react";

import { getOrdersByUserId } from "../../auxiliaryFunctions/firebaseDbQueries";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

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
  const { setPreviousPage, setVehicleFreeData } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    setPreviousPage(false);
    setVehicleFreeData(undefined);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getOrders(user.uid);
      } else {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [isLoading]);

  const getOrders = async (uid) => {
    try {
      const ordersList = await getOrdersByUserId(uid);
      setOrders(ordersList);
      if (ordersList.length > 0) {
        setCurrentOrder(ordersList[0]);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setIsLoading(false);
    }
  };

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
          orders={orders}
          currentOrder={currentOrder}
          setCurrentOrder={setCurrentOrder}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        {currentOrder && (
          <OrderDetails currentOrder={currentOrder} className="order-details" />
        )}
      </Box>
      <Chat currentOrder={currentOrder} />
    </Box>
  );
}

export default DashboardPage;
