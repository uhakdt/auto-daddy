import { useContext } from "react";
import { AppContext, initialData } from "../appContext";
import { logout } from "../firebase";

export const useHandleLogout = () => {
  const appData = useContext(AppContext);

  const handleLogout = async () => {
    try {
      logout();
      sessionStorage.removeItem("appData");
      appData.setUserId(initialData.userId);
      appData.setVehicleFreeData(initialData.vehicleFreeData);
      appData.setVehicleDataBasic(initialData.vehicleBasicData);
      appData.setVehicleDataFull(initialData.vehicleFullData);
      appData.setClickedLoginOrRegisterButton(
        initialData.clickedLoginOrRegisterButton
      );
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return handleLogout;
};
