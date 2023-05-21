import { createContext } from "react";
import { VehicleFreeData } from "./models/VehicleFreeData";
import { VehicleBasicData } from "./models/VehicleBasicData";
import { VehicleFullData } from "./models/VehicleFullData";

export const getStoredData = () => {
  const storedData = sessionStorage.getItem("appData");
  return storedData ? JSON.parse(storedData) : {};
};

export const saveDataToStorage = (data) => {
  sessionStorage.setItem("appData", JSON.stringify(data));
};

export const initialData = getStoredData() || {
  tier: "",
  setTier: (value) => {},
  vehicleFreeData: new VehicleFreeData({}),
  setVehicleFreeData: (value) => {},
  vehicleBasicData: new VehicleBasicData({}),
  setVehicleDataBasic: (value) => {},
  vehicleFullData: new VehicleFullData({}),
  setVehicleDataFull: (value) => {},
};

export const AppContext = createContext(initialData);
