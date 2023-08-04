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

  const setUserId = (value) => {
    setData((prevData) => ({ ...prevData, userId: value }));
  };

  const setRegistrationNumber = (value) => {
    setData((prevData) => ({ ...prevData, registrationNumber: value }));
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

  const setPreviousPage = (value) => {
    setData((prevData) => ({
      ...prevData,
      previousPage: value,
    }));
  };

  const setCurrentOrder = (value) => {
    setData((prevData) => ({
      ...prevData,
      currentOrder: value,
    }));
  };

  return (
    <AppContext.Provider
      value={{
        ...data,
        setUserId,
        setRegistrationNumber,
        setVehicleFreeData,
        setVehicleDataBasic,
        setVehicleDataFull,
        setPreviousPage,
        setCurrentOrder,
      }}
    >
      <BrowserRouter>
        <div className="App">
          <Navigation />
          {children}
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
};
