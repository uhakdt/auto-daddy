import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { getAuth } from "firebase/auth";
import { PayPalButtons } from "@paypal/react-paypal-js";

import { AppContext } from "../../../appContext";

const auth = getAuth();

const PayPalForm = () => {
  const { vehicleFreeData } = useContext(AppContext);

  const navigate = useNavigate();

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
          cost: "15.00",
        }),
      }
    );
    const order = await response.json();
    return order.id;
  };

  const onApprove = async (data, actions) => {
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
      ).then((res) => {
        if (res.status === 200) {
          navigate("/dashboard");
        }
      });
      return await response.json();
    } catch (err) {
      console.error(err);
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

export default PayPalForm;
