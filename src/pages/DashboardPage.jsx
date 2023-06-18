import React, { useState, useEffect, useContext } from "react";
import { auth, db } from "../firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { AppContext } from "../appContext";
import Box from "@mui/material/Box";
import CarLoader from "../components/SVGs/CarLoader";
import "./DashboardPage.css";

import Sidebar from "../components/Sidebar";
import OrderDetails from "../components/OrderDetails";
import Settings from "../components/Settings";

function DashboardPage() {
  const { setPreviousPage, setVehicleFreeData } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const getPaymentIntentFromUrl = () => {
    return new URLSearchParams(window.location.search).get("payment_intent");
  };

  const checkRedirectStatus = () => {
    const redirectStatus = new URLSearchParams(window.location.search).get(
      "redirect_status"
    );
    return redirectStatus === "succeeded";
  };

  useEffect(() => {
    setPreviousPage(false);
    setVehicleFreeData(undefined);

    const fetchOrders = async (user) => {
      const startTime = Date.now();
      const paymentIntent = getPaymentIntentFromUrl();

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

        if (checkRedirectStatus() && paymentIntent) {
          const recentOrder = ordersList.find(
            (order) => order.paymentId === paymentIntent
          );
          if (recentOrder) {
            setSelectedOrder(recentOrder.id); // select the recent order
          } else {
            fetchOrders(user); // refetch if no order with matching paymentId is found
            return;
          }
        } else if (ordersList.length > 0) {
          setSelectedOrder(ordersList[0].id); // select the first order by default
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
    <Box className="dashboard" sx={{ display: "flex" }}>
      <Sidebar
        className="sidebar"
        orders={orders}
        onSelectOrder={(orderId) => {
          setSelectedOrder(orderId);
          setShowSettings(false);
        }}
        onSelectSettings={() => setShowSettings(true)}
      />
      {showSettings ? (
        <Settings />
      ) : (
        <OrderDetails className="order-details" orderId={selectedOrder} />
      )}
    </Box>
  );
}

export default DashboardPage;
