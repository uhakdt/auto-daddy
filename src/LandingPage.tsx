import axios from "axios";
import { useState } from "react";
import { VehicleData } from "./models/VehicleData";
import Button from "@mui/material/Button";

function LandingPage() {
  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);
  const [licensePlate, setLicensePlate] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        `https://checkmycarapi.uhakdt.repl.co/api/v1/dvla/${licensePlate}`
      );
      console.log(
        response.data.DataItems.TechnicalDetails.Dimensions.UnladenWeight
      );
      const vehicle = new VehicleData(response.data.DataItems);
      setVehicleData(vehicle);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Add License Plate Number</h1>
      <input
        type="text"
        placeholder="License Plate"
        value={licensePlate}
        onChange={(e) => setLicensePlate(e.target.value)}
      />
      <Button onClick={handleSubmit}>Submit</Button>
      {vehicleData && (
        <table>
          <thead>
            <tr>
              <th>Property</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tax Status</td>
              <td>
                {vehicleData.VehicleStatus.motVed.taxDue
                  ? new Date(
                      vehicleData.VehicleStatus.motVed.taxDue
                    ).toLocaleDateString()
                  : "-"}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LandingPage;
