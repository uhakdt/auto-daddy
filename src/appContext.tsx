import { createContext } from "react";
import { VehicleFreeData } from "./models/VehicleFreeData";
import { VehicleBasicData } from "./models/VehicleBasicData";
import { VehicleFullData } from "./models/VehicleFullData";

export const getStoredData = () => {
  const storedData = sessionStorage.getItem("appData");
  return storedData ? JSON.parse(storedData) : {};
};

export const saveDataToStorage = (data: any) => {
  sessionStorage.setItem("appData", JSON.stringify(data));
};

export const initialData = getStoredData() || {
  tier: "",
  setTier: (value: string) => {},
  vehicleFreeData: new VehicleFreeData({}),
  setVehicleFreeData: (value: VehicleFreeData) => {},
  vehicleDataBasic: new VehicleBasicData({}),
  setVehicleDataBasic: (value: VehicleBasicData) => {},
  vehicleDataFull: new VehicleFullData({}),
  setVehicleDataFull: (value: VehicleFullData) => {},
};

export const AppContext = createContext(initialData);