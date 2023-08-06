import React, { useState, useEffect, useContext } from "react";
import { auth, db } from "../../firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
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
  // const [showSettings, setShowSettings] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    setPreviousPage(false);
    setVehicleFreeData(undefined);

    const fetchOrders = async (user) => {
      const startTime = Date.now();

      if (user) {
        const ordersRef = collection(db, "orders");
        const q = query(
          ordersRef,
          where("userId", "==", user.uid),
          orderBy("dateTime", "desc")
        );
        const snapshot = await getDocs(q);

        let ordersList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(ordersList);
        console.log("ordersList", ordersList);

        if (ordersList.length > 0) {
          setCurrentOrder(ordersList[0]);
        }

        const timeDiff = Date.now() - startTime;
        const remainingTime = Math.max(1000 - timeDiff, 0);
        setTimeout(() => setIsLoading(false), remainingTime);
      } else {
        setIsLoading(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged(fetchOrders);

    // Cleanup function:
    return () => {
      unsubscribe();
    };
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
