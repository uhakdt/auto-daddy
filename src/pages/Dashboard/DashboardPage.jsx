import React, { useState, useEffect, useContext } from "react";

import { useQuery } from "react-query";

import { getOrdersByUserId } from "../../auxiliaryFunctions/firebaseDbQueries";
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

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
import { useLocation } from "react-router-dom";

const fetchOrdersByAuthUser = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const ordersList = await getOrdersByUserId(user.uid);
            resolve(ordersList);
          } catch (error) {
            reject(error);
          }
        } else {
          resolve([]);
        }
      });
    }, 2000); // TODO: Need to be fixed
  });
};

const getOrderById = async (orderId) => {
  const ordersRef = collection(db, "orders");
  const q = query(ordersRef, where("orderId", "==", orderId));
  const querySnapshot = await getDocs(q);
  const order = querySnapshot.docs.map((doc) => doc.data());
  return order;
};

function DashboardPage() {
  const location = useLocation();
  const { setPreviousPage, setVehicleFreeData } = useContext(AppContext);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery("orders", fetchOrdersByAuthUser, {
    onSuccess: (ordersList) => {
      if (ordersList.length > 0) {
        setCurrentOrder(ordersList[0]);
      }
    },
  });

  // Check for orderId in URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const orderIdFromUrl = params.get("orderId");
    if (orderIdFromUrl) {
      getOrderById(orderIdFromUrl).then((order) => {
        setCurrentOrder(order[0]);
      });
    }
  }, [location]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (isLoading) {
    return (
      <div className="loader">
        <CarLoader />
      </div>
    );
  }

  if (error) {
    console.error("Failed to fetch orders:", error);
    // Handle the error accordingly
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
