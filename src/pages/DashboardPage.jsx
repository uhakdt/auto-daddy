import React, { useState, useEffect, useContext } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { AppContext } from "../appContext";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import Confetti from "react-dom-confetti";

function DashboardPage() {
  const { setPreviousPage, setVehicleFreeData } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

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
        const q = query(ordersRef, where("userId", "==", user.uid));
        const snapshot = await getDocs(q);

        const ordersList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersList);
      }
    };

    const unsubscribe = auth.onAuthStateChanged(fetchOrders);

    // Cleanup function:
    return () => {
      unsubscribe();
    };
  }, []);

  const handleViewOrder = async (orderId) => {
    const orderRef = doc(db, "orders", orderId);
    const docSnap = await getDoc(orderRef);

    if (docSnap.exists()) {
      console.log("Order data:", docSnap.data());
    } else {
      console.log("No such order!");
    }
  };

  return (
    <div>
      <h1>Account Page</h1>
      <p>Welcome to the Account Page!</p>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell component="th" scope="row">
                  {order.id}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleViewOrder(order.id)}
                  >
                    View Order
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="confetti-container">
        <Confetti active={paymentSuccess} config={config} />
      </div>
    </div>
  );
}

export default DashboardPage;
