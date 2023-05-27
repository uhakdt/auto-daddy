import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./Navigation";
import { AppContext, initialData, saveDataToStorage } from "./appContext";

export const App = ({ children }) => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    saveDataToStorage(data);
  }, [data]);

  // Implementing the functions that will modify the state and automatically save it to sessionStorage
  const setUserId = (value) => {
    setData((prevData) => ({ ...prevData, userId: value }));
  };

  const setVehicleFreeData = (value) => {
    setData((prevData) => ({ ...prevData, vehicleFreeData: value }));
  };

  const setVehicleDataBasic = (value) => {
    setData((prevData) => ({ ...prevData, vehicleBasicData: value }));
  };

  const setVehicleDataFull = (value) => {
    setData((prevData) => ({ ...prevData, vehicleFullData: value }));
  };

  const setClickedLoginOrRegisterButton = (value) => {
    setData((prevData) => ({
      ...prevData,
      clickedLoginOrRegisterButton: value,
    }));
  };

  return (
    <AppContext.Provider
      value={{
        ...data,
        setUserId,
        setVehicleFreeData,
        setVehicleDataBasic,
        setVehicleDataFull,
        setClickedLoginOrRegisterButton,
      }}
    >
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <Navigation />
          </header>
          {children}
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
};
