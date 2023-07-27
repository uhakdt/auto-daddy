import React, { useEffect, useState } from "react";

import { storage, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { ref, getDownloadURL } from "firebase/storage";

import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import "./OrderDetails.css";

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

import NewOrder from "./NewOrder/NewOrder";

import { useOrderDetails } from "../../hooks/orderHooks";
import {
  handleDownloadReport,
  handleEmailReport,
} from "../../hooks/reportHooks";
import FormatDate from "../../auxiliaryFunctions/dateFunctions";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} variant="filled" ref={ref} {...props} />;
});

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
  const [aiContentLoading, setAIContentLoading] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [windowData, setWindowData] = useState(null);
  const [showNewOrder, setShowNewOrder] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  console.log("Free: \n", free);
  console.log("Basic: \n", basic);
  console.log("Full: \n", full);

  const [emailStatus, setEmailStatus] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [error, setError] = useState({ status: false, message: "" });

  const goToTAXSection = React.useRef();
  const goToMOTSection = React.useRef();
  const goToFinanceSection = React.useRef();
  const goToWriteOffSection = React.useRef();
  const goToImportExportSection = React.useRef();
  const goToStolenSection = React.useRef();
  const goToPlateSection = React.useRef();
  const goToMileageSection = React.useRef();

  const handleError = (message) => {
    setError({ status: true, message });
  };

  const scrollToRef = (ref) => {
    window.scrollTo({
      top: ref.current.offsetTop - 100,
      behavior: "smooth",
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError({ status: false, message: "" });
  };

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const fileName = `${orderId}_image_0.jpg`;
        const filePath = `user_files/${auth.currentUser.uid}/car_images/${fileName}`;
        const url = await getDownloadURL(ref(storage, filePath));
        setImageUrl(url);
      } catch (err) {
        console.log(err);
      }
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
                ? "#6f508c"
                : "#d55a6f",
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
                ? "#6f508c"
                : "#d55a6f",
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
                ? "#6f508c"
                : "#d55a6f",
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
                ? "#6f508c"
                : "#d55a6f",
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
                ? "#6f508c"
                : "#d55a6f",
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
                ? "#6f508c"
                : "#d55a6f",
            noHover: true,
          },
          {
            title: "Colour",
            details:
              docSnap.data().data.VdiCheckFull.ColourChangeCount === null ||
              docSnap.data().data.VdiCheckFull.ColourChangeCount === 0
                ? "No Records"
                : `Number of Records: ${
                    docSnap.data().data.VdiCheckFull.ColourChangeCount
                  }`,
            onClick: null,
            gradientColor:
              docSnap.data().data.VdiCheckFull.ColourChangeCount === null ||
              docSnap.data().data.VdiCheckFull.ColourChangeCount === 0
                ? "#6f508c"
                : "#d55a6f",
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
                ? "#6f508c"
                : "#d55a6f",
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
              ? "#6f508c"
              : "#d55a6f",
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
              ? "#d55a6f"
              : "#6f508c",
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
                ? "#6f508c"
                : "#d55a6f",
            noHover: true,
          },
          {
            title: "V5C",
            details: `Date Issued: ${FormatDate(
              docSnap.data().data.VdiCheckFull.LatestV5cIssuedDate
            )}`,
            onClick: null,
            gradientColor: docSnap.data().data.VdiCheckFull.LatestV5cIssuedDate
              ? "#6f508c"
              : "#d55a6f",
            noHover: true,
          },
        ]);
        setIsLoading(false);

        const data = docSnap.data(); // suppose this is your order details

        // Initialize AI content loading states
        const loadingStates = new Array(aiContentListSample.length).fill(true);
        setAIContentLoading(loadingStates);
      } else {
        handleError("No such order!");
      }
    };

    if (orderId) fetchOrder();
  }, [orderId]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <div className="order-details">
        <div className={`new-order-transition ${showNewOrder ? "show" : ""}`}>
          <NewOrder />
        </div>
        {order ? (
          <div>
            <VehicleMain
              free={free}
              basic={basic}
              orderId={orderId}
              auth={auth}
              handleDownloadReport={() =>
                handleDownloadReport(orderId, free, auth)
              }
              handleEmailReport={() =>
                handleEmailReport(
                  orderId,
                  free,
                  auth,
                  setEmailStatus,
                  setSnackbarOpen
                )
              }
              emailStatus={emailStatus}
              snackbarOpen={snackbarOpen}
              handleSnackbarClose={handleSnackbarClose}
              showNewOrder={showNewOrder}
              setShowNewOrder={setShowNewOrder}
            />

            <AIMainSummary
              aiContent={aiContentList[0]}
              aiContentLoading={aiContentLoading[0]}
            />

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
              aiContentLoading={aiContentLoading[0]}
              imageUrl={imageUrl}
            />

            <EnergyConsumption
              basic={basic}
              aiContent={aiContentList[0]}
              aiContentLoading={aiContentLoading[0]}
            />

            <MOT
              free={free}
              basic={basic}
              aiContent={aiContentList[0]}
              aiContentLoading={aiContentLoading[0]}
              goToMOTSection={goToMOTSection}
            />

            <TAX
              free={free}
              basic={basic}
              full={full}
              aiContent={aiContentList[0]}
              aiContentLoading={aiContentLoading[0]}
              goToTAXSection={goToTAXSection}
            />

            <Mileage
              full={full}
              aiContent={aiContentList[0]}
              aiContentLoading={aiContentLoading[0]}
              goToMileageSection={goToMileageSection}
            />

            <PlateChanges
              full={full}
              aiContent={aiContentList[0]}
              aiContentLoading={aiContentLoading[0]}
              goToPlateSection={goToPlateSection}
            />

            <OutstandingFinances
              full={full}
              aiContent={aiContentList[0]}
              aiContentLoading={aiContentLoading[0]}
              goToFinanceSection={goToFinanceSection}
            />

            <Stolen
              full={full}
              aiContentList={aiContentList[0]}
              aiContentLoading={aiContentLoading[0]}
              goToStolenSection={goToStolenSection}
            />

            <ImportExport
              full={full}
              aiContent={aiContentList[0]}
              aiContentLoading={aiContentLoading[0]}
              goToImportExportSection={goToImportExportSection}
            />

            <WriteOff
              full={full}
              aiContent={aiContentList[0]}
              aiContentLoading={aiContentLoading[0]}
              goToWriteOffSection={goToWriteOffSection}
            />

            <VICInspected
              full={full}
              aiContent={aiContentList[0]}
              aiContentLoading={aiContentLoading[0]}
            />

            <ImportantChecks
              basic={basic}
              aiContent={aiContentList[0]}
              aiContentLoading={aiContentLoading[0]}
            />

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
          <NewOrder />
        )}
      </div>
      <Snackbar
        open={error.status}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OrderDetails;
