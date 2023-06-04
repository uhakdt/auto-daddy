import React, { useState, useEffect, useContext } from "react";
import { auth, db } from "../firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { AppContext } from "../appContext";
import Confetti from "react-dom-confetti";
import Sidebar from "../components/Sidebar";
import OrderDetails from "../components/OrderDetails";
import Box from "@mui/material/Box";

function DashboardPage() {
  const { setPreviousPage, setVehicleFreeData } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const config = {
    angle: 90,
    spread: 360,
    startVelocity: 20,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: "10px",
    height: "10px",
    perspective: "500px",
    colors: [
      "#FF0000",
      "#FF7F00",
      "#FFFF00",
      "#00FF00",
      "#0000FF",
      "#4B0082",
      "#8F00FF",
    ],
  };

  useEffect(() => {
    setPreviousPage(false);
    setVehicleFreeData(undefined);

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("redirect_status") === "succeeded") {
      setPaymentSuccess(true);
    }

    const fetchOrders = async (user) => {
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
      }
    };

    const unsubscribe = auth.onAuthStateChanged(fetchOrders);

    // Cleanup function:
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar orders={orders} onSelectOrder={setSelectedOrder} />
      <OrderDetails orderId={selectedOrder} />
      <Box className="confetti-container">
        <Confetti active={paymentSuccess} config={config} />
      </Box>
    </Box>
  );
}

export default DashboardPage;
