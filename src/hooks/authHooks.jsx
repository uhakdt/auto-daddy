import { useContext } from "react";
import { AppContext, initialData } from "../appContext";
import { logout } from "../firebase";
import { useNavigate } from "react-router-dom";

export const useHandleLogout = () => {
  const appData = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      logout();
      sessionStorage.removeItem("appData");
      appData.setUserId(initialData.userId);
      appData.setVehicleFreeData(initialData.vehicleFreeData);
      appData.setVehicleDataBasic(initialData.vehicleBasicData);
      appData.setVehicleDataFull(initialData.vehicleFullData);
      appData.setPreviousPage(initialData.previousPage);
      appData.setUser(initialData.user);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return handleLogout;
};
