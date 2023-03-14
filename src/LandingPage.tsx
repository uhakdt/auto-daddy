import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VehicleCheckData } from "./models/VehicleCheckData";

function LandingPage() {
  const [vehicleCheckData, setVehicleCheckData] = useState<VehicleCheckData>();
  const [pattern] = useState<RegExp>(/^[A-Z]{2}\d{2}\s?[A-Z]{3}$/);
  const [licensePlate, setLicensePlate] = useState("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [responseStatus, setResponseStatus] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
    setIsValid(pattern.test(licensePlate));
    try {
      const response = await axios.get(
        `https://checkmycarapi.uhakdt.repl.co/api/v1/dvla/check/${licensePlate}`
      );
      const vehicle = new VehicleCheckData(response.data.VehicleCheckData);
      setVehicleCheckData(vehicle);
      setResponseStatus(true);
    } catch (error) {
      console.log(error);
      setResponseStatus(false);
    }
  };

  const handleNavigateToLogin = () => {
    navigate("/tiers", { state: { vehicleCheckData } });
  };

  if (isValid && isSubmitted && responseStatus) {
    handleNavigateToLogin();
  }

  return (
    <div>
      <h1>Add License Plate Number</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={licensePlate}
          onChange={(event) => setLicensePlate(event.target.value)}
        />
        {isSubmitted && !isValid && <p>Invalid UK license plate number</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default LandingPage;
