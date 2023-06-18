import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import Box from "@mui/material/Box";
import FormatDate from "../auxiliaryFunctions/dateFunctions";

import "./OrderDetails.css";
import { storage } from "../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import VehicleMain from "./OrderDetails/VehicleMain";
import AIMainSummary from "./OrderDetails/AIMainSummary";

import StatusWindow from "./OrderDetails/StatusWindow";
import VehicleDetails from "./OrderDetails/VehicleDetails";
import EnergyConsumption from "./OrderDetails/EnergyConsumption";
import MOT from "./OrderDetails/MOT";
import TAX from "./OrderDetails/TAX";
import Mileage from "./OrderDetails/Mileage";
import PlateChanges from "./OrderDetails/PlateChanges";
import OutstandingFinances from "./OrderDetails/OutstandingFinances";
import Stolen from "./OrderDetails/Stolen";
import ImportExport from "./OrderDetails/ImportExport";
import WriteOff from "./OrderDetails/WriteOff";
import VICInspected from "./OrderDetails/VICInspected";
import ImportantChecks from "./OrderDetails/ImportantChecks";
import { useOrderDetails } from "../auxiliaryHooks/orderHooks";

const auth = getAuth();

const aiContentListSample = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum odio luctus feugiat cursus. Praesent aliquam augue nulla, a porttitor justo pellentesque sit amet. Fusce ac sem sit amet ante sagittis condimentum. Fusce sit amet erat magna. Etiam vehicula lectus orci, eget bibendum mi scelerisque nec. Aliquam nec blandit risus. Mauris pretium ornare ornare. Curabitur molestie purus est, at aliquam diam porttitor eget. Mauris malesuada, ante ac blandit ultrices, lacus mauris laoreet ex, id tempor erat sem a justo.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum ipsum quis magna feugiat, sed interdum nunc aliquet. Ut hendrerit bibendum consequat.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum ipsum quis magna feugiat, sed interdum nunc aliquet. Ut hendrerit bibendum consequat.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum ipsum quis magna feugiat, sed interdum nunc aliquet. Ut hendrerit bibendum consequat.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum ipsum quis magna feugiat, sed interdum nunc aliquet. Ut hendrerit bibendum consequat.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum ipsum quis magna feugiat, sed interdum nunc aliquet. Ut hendrerit bibendum consequat.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum ipsum quis magna feugiat, sed interdum nunc aliquet. Ut hendrerit bibendum consequat.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum ipsum quis magna feugiat, sed interdum nunc aliquet. Ut hendrerit bibendum consequat.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum ipsum quis magna feugiat, sed interdum nunc aliquet. Ut hendrerit bibendum consequat.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum ipsum quis magna feugiat, sed interdum nunc aliquet. Ut hendrerit bibendum consequat.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum ipsum quis magna feugiat, sed interdum nunc aliquet. Ut hendrerit bibendum consequat.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum ipsum quis magna feugiat, sed interdum nunc aliquet. Ut hendrerit bibendum consequat.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum ipsum quis magna feugiat, sed interdum nunc aliquet. Ut hendrerit bibendum consequat.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum ipsum quis magna feugiat, sed interdum nunc aliquet. Ut hendrerit bibendum consequat.",
];

const OrderDetails = ({ orderId }) => {
  const { order, free, basic, full } = useOrderDetails(orderId);
  const [aiContentList, setAIContentList] = useState(aiContentListSample);
  const [imageUrl, setImageUrl] = useState(null);
  const [windowData, setWindowData] = useState(null);
  console.log("Free: \n", free);
  console.log("Basic: \n", basic);
  console.log("Full: \n", full);

  const [emailStatus, setEmailStatus] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const goToTAXSection = React.useRef();
  const goToMOTSection = React.useRef();
  const goToFinanceSection = React.useRef();
  const goToWriteOffSection = React.useRef();
  const goToImportExportSection = React.useRef();
  const goToStolenSection = React.useRef();
  const goToPlateSection = React.useRef();
  const goToMileageSection = React.useRef();

  const scrollToRef = (ref) => {
    window.scrollTo({
      top: ref.current.offsetTop - 100,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const fetchImageUrl = async () => {
      const fileName = `${orderId}_image_0.jpg`;
      const filePath = `user_files/${auth.currentUser.uid}/car_images/${fileName}`;
      const url = await getDownloadURL(ref(storage, filePath));
      setImageUrl(url);
    };

    if (order) fetchImageUrl();
  }, [order]);

  useEffect(() => {
    const fetchOrder = async () => {
      const orderRef = doc(db, "orders", orderId);
      const docSnap = await getDoc(orderRef);

      if (docSnap.exists()) {
        setWindowData([
          {
            title: "TAX",
            details: `Expires: ${FormatDate(
              docSnap.data().vehicleFreeData.TaxDueDate
            )}`,
            onClick: () => scrollToRef(goToTAXSection),
            gradientColor:
              docSnap.data().vehicleFreeData.TaxStatus === "Taxed"
                ? "#e1f909"
                : "#f6514b",
            noHover: false,
          },
          {
            title: "MOT",
            details: `Expires: ${FormatDate(
              docSnap.data().vehicleFreeData.MotExpiryDate
            )}`,
            onClick: () => scrollToRef(goToMOTSection),
            gradientColor:
              docSnap.data().vehicleFreeData.MotStatus === "Valid"
                ? "#e1f909"
                : "#f6514b",
            noHover: false,
          },
          {
            title: "Finances",
            details:
              docSnap.data().data.VdiCheckFull.FinanceRecordCount === 0
                ? "No Records"
                : `Number of Records: ${
                    docSnap.data().data.VdiCheckFull.FinanceRecordCount
                  }`,
            onClick:
              docSnap.data().data.VdiCheckFull.FinanceRecordCount !== 0
                ? () => scrollToRef(goToFinanceSection)
                : null,
            gradientColor:
              docSnap.data().data.VdiCheckFull.FinanceRecordCount === 0
                ? "#e1f909"
                : "#f6514b",
            noHover: false,
          },
          {
            title: "Write Off",
            details:
              docSnap.data().data.VdiCheckFull.WriteOffRecordCount === 0
                ? "No Records"
                : `Number of Records: ${
                    docSnap.data().data.VdiCheckFull.WriteOffRecordCount
                  }`,
            onClick:
              docSnap.data().data.VdiCheckFull.WrittenOff !== false &&
              docSnap.data().data.VdiCheckFull.WriteOffRecordCount !== 0
                ? () => scrollToRef(goToWriteOffSection)
                : null,
            gradientColor:
              docSnap.data().data.VdiCheckFull.WrittenOff === false &&
              docSnap.data().data.VdiCheckFull.WriteOffRecordCount === 0
                ? "#e1f909"
                : "#f6514b",
            noHover:
              docSnap.data().data.VdiCheckFull.WrittenOff === false &&
              docSnap.data().data.VdiCheckFull.WriteOffRecordCount === 0,
          },
          {
            title: "Export",
            details:
              docSnap.data().data.VdiCheckFull.Imported === false &&
              docSnap.data().data.VdiCheckFull.Exported === false
                ? "No Records"
                : "Click to View Details",
            onClick:
              docSnap.data().data.VdiCheckFull.Imported !== false &&
              docSnap.data().data.VdiCheckFull.Exported !== false
                ? () => scrollToRef(goToImportExportSection)
                : null,
            gradientColor:
              docSnap.data().data.VdiCheckFull.Imported === false &&
              docSnap.data().data.VdiCheckFull.Exported === false
                ? "#e1f909"
                : "#f6514b",
            noHover:
              docSnap.data().data.VdiCheckFull.Imported === false &&
              docSnap.data().data.VdiCheckFull.Exported === false,
          },
          {
            title: "Scrapped",
            details:
              docSnap.data().data.VdiCheckFull.Scrapped === false
                ? "No Records"
                : `Scrap Date: ${FormatDate(
                    docSnap.data().data.VdiCheckFull.ScrapDate
                  )}`,
            onClick: null,
            gradientColor:
              docSnap.data().data.VdiCheckFull.Scrapped === false
                ? "#e1f909"
                : "#f6514b",
            noHover: true,
          },
          {
            title: "Colour",
            details:
              docSnap.data().data.VehicleAndMotHistory.VehicleHistory
                .ColourChangeCount === null ||
              docSnap.data().data.VehicleAndMotHistory.VehicleHistory
                .ColourChangeCount === 0
                ? "No Records"
                : `Number of Records: ${
                    docSnap.data().data.VehicleAndMotHistory.VehicleHistory
                      .ColourChangeCount
                  }`,
            onClick: null,
            gradientColor:
              docSnap.data().data.VehicleAndMotHistory.VehicleHistory
                .ColourChangeCount === null ||
              docSnap.data().data.VehicleAndMotHistory.VehicleHistory
                .ColourChangeCount === 0
                ? "#e1f909"
                : "#f6514b",
            noHover: true,
          },
          {
            title: "Plate",
            details:
              docSnap.data().data.VdiCheckFull.PlateChangeCount === null ||
              docSnap.data().data.VdiCheckFull.PlateChangeCount === 0
                ? "No Records"
                : `Number of Records: ${
                    docSnap.data().data.VdiCheckFull.PlateChangeCount
                  }`,
            onClick:
              docSnap.data().data.VdiCheckFull.PlateChangeCount > 0
                ? () => scrollToRef(goToPlateSection)
                : null,
            gradientColor:
              docSnap.data().data.VdiCheckFull.PlateChangeCount < 2
                ? "#e1f909"
                : "#f6514b",
            noHover:
              docSnap.data().data.VdiCheckFull.PlateChangeCount === 0 ||
              docSnap.data().data.VdiCheckFull.PlateChangeCount === null,
          },
          {
            title: "Stolen",
            details:
              docSnap.data().data.VdiCheckFull.Stolen === false ||
              docSnap.data().data.VdiCheckFull.Stolen === null
                ? "No Records"
                : "Click to View Details",
            onClick: docSnap.data().data.VdiCheckFull.Stolen
              ? () => scrollToRef(goToStolenSection)
              : null,
            gradientColor: !docSnap.data().data.VdiCheckFull.Stolen
              ? "#e1f909"
              : "#f6514b",
            noHover: !docSnap.data().data.VdiCheckFull.Stolen,
          },
          {
            title: "Mileage",
            details:
              docSnap.data().data.VdiCheckFull.MileageAnomalyDetected ===
                false &&
              docSnap.data().data.VdiCheckFull.MileageAnomalyDetected === null
                ? "No Records"
                : `Number of Records: ${
                    docSnap.data().data.VdiCheckFull.MileageRecordCount
                  }`,
            onClick: () => scrollToRef(goToMileageSection),
            gradientColor: docSnap.data().data.VdiCheckFull
              .MileageAnomalyDetected
              ? "#f6514b"
              : "#e1f909",
            noHover: false,
          },
          {
            title: "Keepers",
            details:
              docSnap.data().data.VdiCheckFull.PreviousKeeperCount === null ||
              docSnap.data().data.VdiCheckFull.PreviousKeeperCount === 0
                ? "No Records"
                : `Number of Records: ${
                    docSnap.data().data.VdiCheckFull.PreviousKeeperCount
                  }`,
            onClick: null,
            gradientColor:
              docSnap.data().data.VdiCheckFull.PreviousKeeperCount < 2
                ? "#e1f909"
                : "#f6514b",
            noHover: true,
          },
          {
            title: "V5C",
            details: `Date Issued: ${FormatDate(
              docSnap.data().data.VdiCheckFull.LatestV5cIssuedDate
            )}`,
            onClick: null,
            gradientColor: docSnap.data().data.VdiCheckFull.LatestV5cIssuedDate
              ? "#e1f909"
              : "#f6514b",
            noHover: true,
          },
        ]);
      } else {
        console.log("No such order!");
      }
    };

    if (orderId) fetchOrder();
  }, [orderId]);

  const handleDownloadReport = async () => {
    try {
      const vehicleRegMark = free.RegistrationNumber;
      const userId = auth.currentUser.uid;
      const url = `${process.env.REACT_APP_API_URL}/download-report`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId, vehicleRegMark, userId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { url: downloadUrl } = await response.json();

      // Create new link and trigger click event on it
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.target = "_blank"; // to open in a new tab
      link.download = "report.pdf";
      link.click();
    } catch (err) {
      console.error("Error downloading file:", err);
    }
  };

  const handleEmailReport = async () => {
    try {
      const vehicleRegMark = free.RegistrationNumber;
      const userId = auth.currentUser.uid;
      const email = auth.currentUser.email;

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/email-report`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderId, vehicleRegMark, userId, email }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      setEmailStatus({ success: true, message: result.message });
      setSnackbarOpen(true);
    } catch (err) {
      setEmailStatus({ success: false, message: err.toString() });
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <div className="order-details">
        {order ? (
          <div>
            <VehicleMain
              free={free}
              basic={basic}
              handleDownloadReport={handleDownloadReport}
              handleEmailReport={handleEmailReport}
              emailStatus={emailStatus}
              snackbarOpen={snackbarOpen}
              handleSnackbarClose={handleSnackbarClose}
            />

            <AIMainSummary aiContentList={aiContentList} />

            {/* STATUS WINDOWS */}
            <section className="status-windows-container">
              {windowData &&
                windowData.map((window, index) => (
                  <StatusWindow
                    key={index}
                    title={window.title}
                    details={window.details}
                    onClick={window.onClick}
                    gradientColor={window.gradientColor}
                    noHover={window.noHover}
                  />
                ))}
            </section>

            <VehicleDetails
              free={free}
              basic={basic}
              aiContent={aiContentList[0]}
              imageUrl={imageUrl}
            />

            <EnergyConsumption basic={basic} aiContent={aiContentList[0]} />

            <MOT
              free={free}
              basic={basic}
              aiContent={aiContentList[0]}
              goToMOTSection={goToMOTSection}
            />

            <TAX
              free={free}
              basic={basic}
              full={full}
              aiContent={aiContentList[0]}
              goToTAXSection={goToTAXSection}
            />

            <Mileage
              full={full}
              aiContent={aiContentList[0]}
              goToMileageSection={goToMileageSection}
            />

            <PlateChanges
              full={full}
              aiContent={aiContentList[0]}
              goToPlateSection={goToPlateSection}
            />

            <OutstandingFinances
              full={full}
              aiContent={aiContentList[0]}
              goToFinanceSection={goToFinanceSection}
            />

            <Stolen
              full={full}
              aiContentList={aiContentList[0]}
              goToStolenSection={goToStolenSection}
            />

            <ImportExport
              full={full}
              aiContent={aiContentList[0]}
              goToImportExportSection={goToImportExportSection}
            />

            <WriteOff
              full={full}
              aiContent={aiContentList[0]}
              goToWriteOffSection={goToWriteOffSection}
            />

            <VICInspected full={full} aiContent={aiContentList[0]} />

            <ImportantChecks basic={basic} aiContent={aiContentList[0]} />

            {/* ABOUT THIS REPORT */}
            <section className="section">
              <div className="section-title">About This Report</div>
              <div className="section-divider"></div>
              <div className="section-content">
                <div>Date of Registration: {FormatDate(order.dateTime)}</div>
                <br />
                <div>Report Reference: {order.orderId}</div>
              </div>
            </section>
          </div>
        ) : (
          <p>Create an Order here! TODO:</p>
        )}
      </div>
    </Box>
  );
};

export default OrderDetails;
