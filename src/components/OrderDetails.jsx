import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Box from "@mui/material/Box";

const OrderDetails = ({ orderId }) => {
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const orderRef = doc(db, "orders", orderId);
      const docSnap = await getDoc(orderRef);

      if (docSnap.exists()) {
        setOrderData(docSnap.data());
      } else {
        console.log("No such order!");
      }
    };

    if (orderId) fetchOrder();
  }, [orderId]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <div className="order-details">
        {orderData ? (
          <div>
            <section>
              {orderData.registrationNumber && (
                <p>Registration Number: {orderData.registrationNumber}</p>
              )}
              {orderData.data.VehicleAndMotHistory.VehicleRegistration
                .MakeModel && (
                <p>
                  Make and Model:
                  {
                    orderData.data.VehicleAndMotHistory.VehicleRegistration
                      .MakeModel
                  }
                </p>
              )}
              {orderData.dateTime && (
                <p>
                  Date and Time: {new Date(orderData.dateTime).toLocaleString()}
                </p>
              )}
            </section>
            <section>
              <h2>Report Summary</h2>
              <p>PASS</p>
            </section>
            <section>
              <h2>Vehicle Identity</h2>
              {orderData.registrationNumber && (
                <p>Registration Number: {orderData.registrationNumber}</p>
              )}
              {orderData.data.VehicleAndMotHistory.VehicleRegistration
                .MakeModel && (
                <p>
                  Vehicle:
                  {
                    orderData.data.VehicleAndMotHistory.VehicleRegistration
                      .MakeModel
                  }
                </p>
              )}
              {orderData.data.VehicleAndMotHistory.VehicleRegistration
                .MakeModel && (
                <p>
                  Vehicle:
                  {
                    orderData.data.VehicleAndMotHistory.VehicleRegistration
                      .MakeModel
                  }
                </p>
              )}
            </section>
            <section>
              <h2>Vehicle History</h2>
            </section>
            <section>
              <h2>Mileage History</h2>
            </section>
            <section>
              <h2>Keeper History</h2>
            </section>
            <section>
              <h2>Vehicle Specification</h2>
            </section>
            <section>
              <h2>Mileage Summary</h2>
            </section>
            <section>
              <h2>Vehicle Performance</h2>
            </section>
            <section>
              <h2>Running Costs</h2>
            </section>
            <section>
              <h2>Registration History</h2>
            </section>
            <section>
              <h2>MOT Identity</h2>
            </section>
            <section>
              <h2>About this Report</h2>
            </section>
          </div>
        ) : (
          <p>No order selected.</p>
        )}
      </div>
    </Box>
  );
};

export default OrderDetails;
