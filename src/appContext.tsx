import { createContext } from "react";
import { VehicleCheckData } from "./models/VehicleCheckData";

export const getStoredData = () => {
  const storedData = localStorage.getItem("appData");
  return storedData ? JSON.parse(storedData) : {};
};

export const saveDataToStorage = (data: any) => {
  localStorage.setItem("appData", JSON.stringify(data));
};

export const initialData = getStoredData() || {
  tier: "",
  setTier: (value: string) => {},
  vehicleCheckData: new VehicleCheckData({}),
  setVehicleCheckData: (value: VehicleCheckData) => {},
};

export const AppContext = createContext(initialData);
