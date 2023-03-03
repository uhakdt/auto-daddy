import axios from "axios";
import { useState } from "react";
import { VehicleData } from "./VehicleData";

function LandingPage() {
  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);
  const [licensePlate, setLicensePlate] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        `https://checkmycarapi.uhakdt.repl.co/api/v1/dvla/${licensePlate}`
      );
      const vehicle = new VehicleData(response.data);
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
      <button onClick={handleSubmit}>Submit</button>
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
              <td>Registration Number</td>
              <td>{vehicleData.registrationNumber}</td>
            </tr>
            <tr>
              <td>Tax Status</td>
              <td>{vehicleData.taxStatus}</td>
            </tr>
            <tr>
              <td>Tax Due Date</td>
              <td>{vehicleData.taxDueDate.toLocaleDateString()}</td>
            </tr>
            <tr>
              <td>MOT Status</td>
              <td>{vehicleData.motStatus}</td>
            </tr>
            <tr>
              <td>Make</td>
              <td>{vehicleData.make}</td>
            </tr>
            <tr>
              <td>Year of Manufacture</td>
              <td>{vehicleData.yearOfManufacture}</td>
            </tr>
            <tr>
              <td>Engine Capacity</td>
              <td>{vehicleData.engineCapacity}</td>
            </tr>
            <tr>
              <td>CO2 Emissions</td>
              <td>{vehicleData.co2Emissions}</td>
            </tr>
            <tr>
              <td>Fuel Type</td>
              <td>{vehicleData.fuelType}</td>
            </tr>
            <tr>
              <td>Marked for Export</td>
              <td>{vehicleData.markedForExport ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td>Colour</td>
              <td>{vehicleData.colour}</td>
            </tr>
            <tr>
              <td>Type Approval</td>
              <td>{vehicleData.typeApproval}</td>
            </tr>
            <tr>
              <td>Date of Last V5C Issued</td>
              <td>{vehicleData.dateOfLastV5CIssued.toLocaleDateString()}</td>
            </tr>
            <tr>
              <td>MOT Expiry Date</td>
              <td>{vehicleData.motExpiryDate.toLocaleDateString()}</td>
            </tr>
            <tr>
              <td>Wheelplan</td>
              <td>{vehicleData.wheelplan}</td>
            </tr>
            <tr>
              <td>Month of First Registration</td>
              <td>
                {vehicleData.monthOfFirstRegistration.toLocaleDateString()}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LandingPage;
