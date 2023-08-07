import { db } from "../firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

export const getOrdersByUserId = async (userId) => {
  const ordersRef = collection(db, "orders");
  const q = query(
    ordersRef,
    where("userId", "==", userId),
    orderBy("dateTime", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
