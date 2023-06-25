import React, { useContext } from "react";
import { AppContext } from "../appContext";
import { getAuth } from "firebase/auth";

import { PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-hot-toast";

const auth = getAuth();

const PaypPalPayment = () => {
  const { vehicleFreeData } = useContext(AppContext);
  console.log(window);

  const createOrder = async (data, actions) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/create-paypal-order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: "Full Car Check",
          cost: "9.00",
        }),
      }
    );
    const order = await response.json();
    console.log("ordercreate data", order);
    return order.id;
  };

  const onApprove = async (data) => {
    console.log("onapprovedata", data);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/capture-paypal-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderID: data.orderID,
            email: auth.currentUser.email,
            vehicleFreeData: vehicleFreeData,
          }),
        }
      );
      toast("Payment successful!", {
        icon: "🥳",
        style: {
          borderRadius: "5px",
          background: "#333",
          color: "#fff",
        },
      });
      return await response.json();
    } catch (err) {
      toast.error("Payment Failed!");
      console.log("Payment Error", err);
    }
  };

  return (
    <PayPalButtons
      style={{ color: "white", label: "pay", layout: "horizontal" }}
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
      showSpinner={true}
    />
  );
};

export default PaypPalPayment;
