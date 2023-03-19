import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./appContext";

export default function PaymentPage() {
  const [appData] = useContext(AppContext);
  const { tier, vehicleCheckData } = appData;
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const renderProductSection = (tier: string) => {
    console.log(tier === "Basic Check");
    switch (tier) {
      case "Initial Check":
        return (
          <div>
            <h2 style={{ color: "black" }}>Initial Check</h2>
          </div>
        );
      case "Basic Check":
        return (
          <div>
            <h2 style={{ color: "black" }}>Basic Check</h2>
          </div>
        );
      case "Full Check":
        return (
          <div>
            <h2 style={{ color: "black" }}>Full Check</h2>
          </div>
        );
      // Add more cases for other tiers if needed.
      default:
        return null;
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  const handlePurchase = async () => {
    try {
      const response = await axios.post(
        `https://AutoDaddyAPI.uhakdt.repl.co/api/v1/create-checkout-session?tier=${tier}`
      );
      // TODO: This should not be || true
      if (response.data.success || true) {
        const getResponse = await axios.get("your_get_request_url_here", {
          data: {
            tier,
            vehicleCheckData,
          },
        });
        console.log(getResponse);

        // Redirect the user to the dashboard page.
        navigate("/dashboard");
      } else {
        setMessage("An error occurred, please try again.");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred, please try again.");
    }
  };

  return message ? (
    <section>
      <p>{message}</p>
    </section>
  ) : (
    <section>
      {renderProductSection(tier)}
      <button onClick={handlePurchase}>Purchase</button>
    </section>
  );
}
