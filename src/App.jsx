import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./Navigation";
import { AppContext, initialData, saveDataToStorage } from "./appContext";
import { Helmet } from "react-helmet";

export const App = ({ children }) => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    saveDataToStorage(data);
  }, [data]);

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

  const setOrders = (value) => {
    setData((prevData) => ({
      ...prevData,
      orders: value,
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
        setRegistrationNumber,
        setVehicleFreeData,
        setVehicleDataBasic,
        setVehicleDataFull,
        setPreviousPage,
        setOrders,
        setCurrentOrder,
      }}
    >
      <BrowserRouter>
        <Helmet>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-W3S4NBW5BY"
          ></script>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=AW-11289562676"
          ></script>
          <script>
            {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-W3S4NBW5BY');
        gtag('config', 'AW-11289562676');
        `}
          </script>
        </Helmet>

        <div className="App">
          <Navigation />
          {children}
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
};
