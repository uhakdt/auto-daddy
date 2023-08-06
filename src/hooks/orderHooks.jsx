import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const useOrderDetails = (orde) => {
  const [order, setOrder] = useState(null);
  const [free, setVehicleFreeData] = useState(null);
  const [basic, setVehicleAndMotHistory] = useState(null);
  const [full, setVdiCheckFull] = useState(null);

  // useEffect(() => {
  //   const fetchOrder = async () => {
  //     const orderRef = doc(db, "orders", orderId);
  //     const docSnap = await getDoc(orderRef);

  //     if (docSnap.exists()) {
  //       setOrder(docSnap.data());
  //       setVehicleFreeData(docSnap.data().vehicleFreeData);
  //       setVehicleAndMotHistory(docSnap.data().data.VehicleAndMotHistory);
  //       setVdiCheckFull(docSnap.data().data.VdiCheckFull);
  //     }
  //   };

  //   if (orderId) fetchOrder();
  // }, [orderId]);

  return { order, free, basic, full };
};
