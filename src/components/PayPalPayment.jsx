import { PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-hot-toast";

const PaypPalPayment = () => {
  console.log(window);
  const serverUrl = "http://localhost:4242/api/v1";

  const createOrder = async (data, actions) => {
    const response = await fetch(`${serverUrl}/create-paypal-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: {
          description: "Full Package",
          cost: "9.00",
        },
      }),
    });
    const order = await response.json();
    console.log("ordercreate data", order);
    return order.id;
  };

  const onApprove = async (data) => {
    console.log("onapprovedata", data);
    try {
      const response = await fetch(`${serverUrl}/capture-paypal-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderID: data.orderID,
        }),
      });
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
      style={{ layout: "horizontal" }}
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
    />
  );
};

export default PaypPalPayment;
