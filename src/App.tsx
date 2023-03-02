import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [licensePlate, setLicensePlate] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        `https://checkmycarapi.uhakdt.repl.co/api/v1/dvla/${licensePlate}`
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Add License Plate Number</h1>
        <input
          type="text"
          placeholder="License Plate"
          value={licensePlate}
          onChange={(e) => setLicensePlate(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </header>
    </div>
  );
}

export default App;
