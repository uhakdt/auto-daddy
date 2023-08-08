import { db } from "../firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

export const getOrdersByUserId = async (uid) => {
  const ordersRef = collection(db, "orders");
  const q = query(
    ordersRef,
    where("uid", "==", uid),
    orderBy("dateTime", "desc")
  );
  const snapshot = await getDocs(q);
  console.log(snapshot);
  const ordersList = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log(ordersList);
  return ordersList;
};
