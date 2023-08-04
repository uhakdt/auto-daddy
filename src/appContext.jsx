import { createContext } from "react";
import { VehicleFreeData } from "./models/VehicleFreeData";
import { VehicleFullData } from "./models/VehicleFullData";

export const getStoredData = () => {
  const storedData = sessionStorage.getItem("appData");
  return storedData ? JSON.parse(storedData) : {};
};

export const saveDataToStorage = (data) => {
  sessionStorage.setItem("appData", JSON.stringify(data));
};

export const initialData = getStoredData() || {
  userId: "",
  registrationNumber: "",
  vehicleFreeData: new VehicleFreeData({}),
  vehicleFullData: new VehicleFullData({}),
  previousPage: false,
  orders: [],
  currentOrder: null,
};

export const AppContext = createContext(initialData);
