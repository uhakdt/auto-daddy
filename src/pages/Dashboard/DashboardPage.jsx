import React, { useState, useEffect, useContext } from "react";

import { useQuery } from "react-query";

import { getOrdersByUserId } from "../../auxiliaryFunctions/firebaseDbQueries";
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

import { AppContext } from "../../appContext";

import Box from "@mui/material/Box";
import "./DashboardPage.css";
import { useLottie } from "lottie-react";
import jeep from "../../SVGs/jeep.json";

import Sidebar from "./Sidebar/Sidebar";
import OrderDetails from "./OrderDetails";
import Settings from "./Settings/Settings";
import Header from "./Header/Header";
import { Style } from "@mui/icons-material";
import Chat from "./Chat/Chat";
import { useLocation } from "react-router-dom";

const fetchOrdersByAuthUser = async () => {
  return new Promise((resolve, reject) => {
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
  const { currentOrder, setCurrentOrder, registrationNumber } =
    useContext(AppContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPolling, setIsPolling] = useState(false);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const fromPackage = params.get("from") === "package";
  const orderIdFromUrl = params.get("orderId");

  const options = {
    animationData: jeep,
    loop: true,
    style: {
      height: "10rem",
    },
  };

  const { View } = useLottie(options);

  useEffect(() => {
    if (fromPackage) {
      setIsPolling(true);
    }
  }, [fromPackage]);

  const {
    data: orders,
    isLoading,
    error,
    refetch,
  } = useQuery("orders", fetchOrdersByAuthUser, {
    onSuccess: (ordersList) => {
      if (
        ordersList.length > 0 &&
        ordersList[0].vehicleFreeData.RegistrationNumber === registrationNumber
      ) {
        setCurrentOrder(ordersList[0]);
        setIsPolling(false);
      } else if (fromPackage) {
        setIsPolling(true);
      }
    },
  });

  useEffect(() => {
    if (isPolling) {
      const intervalId = setInterval(() => {
        refetch();
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isPolling, refetch]);

  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    if (orderIdFromUrl) {
      getOrderById(orderIdFromUrl).then((order) => {
        if (order && order.length > 0) {
          setCurrentOrder(order[0]);
          setSelectedOrderId(order[0].orderId);
        } else {
          console.error("Order not found");
        }
      });
    }
  }, [orderIdFromUrl]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (isPolling) {
    return <div className="loader">{View}</div>;
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
      {orders && currentOrder && (
        <>
          <Box
            className="dashboard-content"
            sx={{ display: "flex", flex: "1" }}
          >
            <Sidebar
              className="sidebar"
              orders={orders}
              isSidebarOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
              selectedOrderId={selectedOrderId}
              setSelectedOrderId={setSelectedOrderId}
            />

            <OrderDetails
              currentOrder={currentOrder}
              className="order-details"
            />
          </Box>
          <Chat currentOrder={currentOrder} />
        </>
      )}
    </Box>
  );
}

export default DashboardPage;
