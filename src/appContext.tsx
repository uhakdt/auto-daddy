import { createContext } from "react";
import { VehicleCheckData } from "./models/VehicleCheckData";
import { VehicleDataBasic } from "./models/VehicleDataBasic";
import { VehicleDataFull } from "./models/VehicleDataFull";
import { VehicleDataInitial } from "./models/VehicleDataInitial";

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
  vehicleCheckData: new VehicleCheckData({}),
  setVehicleCheckData: (value: VehicleCheckData) => {},
  vehicleDataInitial: new VehicleDataInitial({}),
  setVehicleDataInitial: (value: VehicleDataInitial) => {},
  vehicleDataBasic: new VehicleDataBasic({}),
  setVehicleDataBasic: (value: VehicleDataBasic) => {},
  vehicleDataFull: new VehicleDataFull({}),
  setVehicleDataFull: (value: VehicleDataFull) => {},
};

export const AppContext = createContext(initialData);
