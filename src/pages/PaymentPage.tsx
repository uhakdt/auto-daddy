import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../appContext";
import { VehicleFreeData } from "../models/VehicleFreeData";
import { VehicleBasicData } from "../models/VehicleBasicData";
import { VehicleFullData } from "../models/VehicleFullData";

interface AppData {
  tier: string;
  vehicleFreeData: VehicleFreeData;
  vehicleDataBasic: VehicleBasicData;
  vehicleDataFull: VehicleFullData;
}

export default function PaymentPage() {
  const [appData, setAppData] = useContext(AppContext);
  const { tier, vehicleFreeData }: AppData = appData;
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  console.log(tier, vehicleFreeData);

  const renderProductSection = (tier: string) => {
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
        `http://localhost:4242/api/v1/create-checkout-session?tier=${tier}`
      );
      if (response.status === 200) {
        var tempTier = "";
        if (tier === "Initial Check") tempTier = "initial";
        if (tier === "Basic Check") tempTier = "basic";
        if (tier === "Full Check") tempTier = "full";
        await axios
          .post(`http://localhost:4242/api/v1/vehicledata/${tempTier}`, {
            registrationNumber: vehicleFreeData.registrationNumber,
          })
          .then((res) => {
            console.log(res.data);
            if (tier === "Basic Check") {
              const vehicleDataBasic = new VehicleBasicData(
                res.data.VehicleData
              );
              setAppData((prevData: any) => ({
                ...prevData,
                vehicleDataBasic,
              }));
            } else if (tier === "Full Check") {
              const vehicleDataFull = new VehicleFullData(res.data.DataItems);
              setAppData((prevData: any) => ({
                ...prevData,
                vehicleDataFull,
              }));
            }
          });

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
