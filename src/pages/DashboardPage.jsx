import React, { useState, useEffect, useContext } from "react";
import { auth, db } from "../firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { AppContext } from "../appContext";
import Sidebar from "../components/Sidebar";
import OrderDetails from "../components/OrderDetails";
import Box from "@mui/material/Box";
import CarLoader from "../components/SVGs/CarLoader";
import "./DashboardPage.css";

function DashboardPage() {
  const { setPreviousPage, setVehicleFreeData } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

        const ordersList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersList);

        if (ordersList.length > 0) {
          setSelectedOrder(ordersList[0].id);
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
        onSelectOrder={setSelectedOrder}
      />
      <OrderDetails className="order-details" orderId={selectedOrder} />
    </Box>
  );
}

export default DashboardPage;
