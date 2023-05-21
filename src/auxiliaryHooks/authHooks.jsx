import { useContext } from "react";
import { AppContext, initialData } from "../appContext";
import { logout } from "../firebase";

export const useHandleLogout = () => {
  const [_, setAppData] = useContext(AppContext);

  const handleLogout = async () => {
    try {
      logout();
      sessionStorage.removeItem("appData");
      setAppData(initialData);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return handleLogout;
};
