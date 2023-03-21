import axios from "axios";
import { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../appContext";
import { VehicleCheckData } from "../models/VehicleCheckData";

function LandingPage() {
  const [appData, setAppData] = useContext(AppContext);
  const { tier, vehicleCheckData } = appData;
  const [pattern] = useState<RegExp>(/^[A-Z]{2}\d{2}\s?[A-Z]{3}$/i);
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
      await axios
        .get(`http://localhost:4242/api/v1/vehicledata/check/${licensePlate}`)
        .then((res) => {
          const vehicleCheckData = new VehicleCheckData(
            res.data.VehicleCheckData
          );
          setAppData((prevData: any) => ({
            ...prevData,
            vehicleCheckData,
          }));
          setResponseStatus(true);
        });
    } catch (error) {
      console.log(error);
      setResponseStatus(false);
    }
  };

  const handleNavigateToLogin = useCallback(() => {
    navigate("/tiers", { state: { tier, vehicleCheckData } });
  }, [navigate, vehicleCheckData, tier]);

  useEffect(() => {
    if (isValid && isSubmitted && responseStatus) {
      handleNavigateToLogin();
    }
  }, [isValid, isSubmitted, responseStatus, handleNavigateToLogin]);

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
