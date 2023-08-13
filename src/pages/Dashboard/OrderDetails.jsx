import React, { useEffect, useState } from "react";

import { storage, db, auth } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
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

import {
  handleDownloadReport,
  handleEmailReport,
} from "../../hooks/reportHooks";
import FormatDate from "../../auxiliaryFunctions/dateFunctions";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} variant="filled" ref={ref} {...props} />;
});

const OrderDetails = ({ currentOrder }) => {
  const [free, setFree] = useState(null);
  const [basic, setBasic] = useState(null);
  const [full, setFull] = useState(null);
  const [aiContent, setAIContent] = useState(null);
  const [aiContentLoading, setAIContentLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);
  const [windowData, setWindowData] = useState(null);
  const [showNewOrder, setShowNewOrder] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  const fetchImageUrl = async () => {
    try {
      const fileName = `${currentOrder.orderId}_image_0.jpg`;
      const filePath = `user_files/${currentOrder.uid}/car_images/${fileName}`;
      const url = await getDownloadURL(ref(storage, filePath));
      setImageUrl(url);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError({ status: false, message: "" });
  };

  const fetchAIContent = async () => {
    try {
      const response = await fetch("http://localhost:4242/api/v1/gpt/summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          extractedData: currentOrder["extractedData"],
        }),
      });

      const aiContent = await response.json();

      const orderRef = doc(db, "orders", currentOrder.orderId);
      await setDoc(orderRef, { aiContent }, { merge: true });

      setAIContent(aiContent);
      setAIContentLoading(false);
    } catch (error) {
      console.error("Error fetching AI content:", error);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const generateWindowData = (currentOrder) => {
    const windowData = [
      {
        title: "TAX",
        details: `Expires: ${FormatDate(
          currentOrder.vehicleFreeData.TaxDueDate
        )}`,
        onClick: () => scrollToRef(goToTAXSection),
        gradientColor:
          currentOrder.vehicleFreeData.TaxStatus === "Taxed"
            ? "#6f508c"
            : "#d55a6f",
        noHover: false,
      },
      {
        title: "MOT",
        details: `Expires: ${FormatDate(
          currentOrder.vehicleFreeData.MotExpiryDate
        )}`,
        onClick: () => scrollToRef(goToMOTSection),
        gradientColor:
          currentOrder.vehicleFreeData.MotStatus === "Valid"
            ? "#6f508c"
            : "#d55a6f",
        noHover: false,
      },
      {
        title: "Finances",
        details:
          currentOrder.data.VdiCheckFull.FinanceRecordCount === 0
            ? "No Records"
            : `Number of Records: ${currentOrder.data.VdiCheckFull.FinanceRecordCount}`,
        onClick:
          currentOrder.data.VdiCheckFull.FinanceRecordCount !== 0
            ? () => scrollToRef(goToFinanceSection)
            : null,
        gradientColor:
          currentOrder.data.VdiCheckFull.FinanceRecordCount === 0
            ? "#6f508c"
            : "#d55a6f",
        noHover: false,
      },
      {
        title: "Write Off",
        details:
          currentOrder.data.VdiCheckFull.WriteOffRecordCount === 0
            ? "No Records"
            : `Number of Records: ${currentOrder.data.VdiCheckFull.WriteOffRecordCount}`,
        onClick:
          currentOrder.data.VdiCheckFull.WrittenOff !== false &&
          currentOrder.data.VdiCheckFull.WriteOffRecordCount !== 0
            ? () => scrollToRef(goToWriteOffSection)
            : null,
        gradientColor:
          currentOrder.data.VdiCheckFull.WrittenOff === false &&
          currentOrder.data.VdiCheckFull.WriteOffRecordCount === 0
            ? "#6f508c"
            : "#d55a6f",
        noHover:
          currentOrder.data.VdiCheckFull.WrittenOff === false &&
          currentOrder.data.VdiCheckFull.WriteOffRecordCount === 0,
      },
      {
        title: "Export",
        details:
          currentOrder.data.VdiCheckFull.Imported === false &&
          currentOrder.data.VdiCheckFull.Exported === false
            ? "No Records"
            : "Click to View Details",
        onClick:
          currentOrder.data.VdiCheckFull.Imported !== false &&
          currentOrder.data.VdiCheckFull.Exported !== false
            ? () => scrollToRef(goToImportExportSection)
            : null,
        gradientColor:
          currentOrder.data.VdiCheckFull.Imported === false &&
          currentOrder.data.VdiCheckFull.Exported === false
            ? "#6f508c"
            : "#d55a6f",
        noHover:
          currentOrder.data.VdiCheckFull.Imported === false &&
          currentOrder.data.VdiCheckFull.Exported === false,
      },
      {
        title: "Scrapped",
        details:
          currentOrder.data.VdiCheckFull.Scrapped === false
            ? "No Records"
            : `Scrap Date: ${FormatDate(
                currentOrder.data.VdiCheckFull.ScrapDate
              )}`,
        onClick: null,
        gradientColor:
          currentOrder.data.VdiCheckFull.Scrapped === false
            ? "#6f508c"
            : "#d55a6f",
        noHover: true,
      },
      {
        title: "Colour",
        details:
          currentOrder.data.VdiCheckFull.ColourChangeCount === null ||
          currentOrder.data.VdiCheckFull.ColourChangeCount === 0
            ? "No Records"
            : `Number of Records: ${currentOrder.data.VdiCheckFull.ColourChangeCount}`,
        onClick: null,
        gradientColor:
          currentOrder.data.VdiCheckFull.ColourChangeCount === null ||
          currentOrder.data.VdiCheckFull.ColourChangeCount === 0
            ? "#6f508c"
            : "#d55a6f",
        noHover: true,
      },
      {
        title: "Plate",
        details:
          currentOrder.data.VdiCheckFull.PlateChangeCount === null ||
          currentOrder.data.VdiCheckFull.PlateChangeCount === 0
            ? "No Records"
            : `Number of Records: ${currentOrder.data.VdiCheckFull.PlateChangeCount}`,
        onClick:
          currentOrder.data.VdiCheckFull.PlateChangeCount > 0
            ? () => scrollToRef(goToPlateSection)
            : null,
        gradientColor:
          currentOrder.data.VdiCheckFull.PlateChangeCount < 2
            ? "#6f508c"
            : "#d55a6f",
        noHover:
          currentOrder.data.VdiCheckFull.PlateChangeCount === 0 ||
          currentOrder.data.VdiCheckFull.PlateChangeCount === null,
      },
      {
        title: "Stolen",
        details:
          currentOrder.data.VdiCheckFull.Stolen === false ||
          currentOrder.data.VdiCheckFull.Stolen === null
            ? "No Records"
            : "Click to View Details",
        onClick: currentOrder.data.VdiCheckFull.Stolen
          ? () => scrollToRef(goToStolenSection)
          : null,
        gradientColor: !currentOrder.data.VdiCheckFull.Stolen
          ? "#6f508c"
          : "#d55a6f",
        noHover: !currentOrder.data.VdiCheckFull.Stolen,
      },
      {
        title: "Mileage",
        details:
          currentOrder.data.VdiCheckFull.MileageAnomalyDetected === false &&
          currentOrder.data.VdiCheckFull.MileageAnomalyDetected === null
            ? "No Records"
            : `Number of Records: ${currentOrder.data.VdiCheckFull.MileageRecordCount}`,
        onClick: () => scrollToRef(goToMileageSection),
        gradientColor: currentOrder.data.VdiCheckFull.MileageAnomalyDetected
          ? "#d55a6f"
          : "#6f508c",
        noHover: false,
      },
      {
        title: "Keepers",
        details:
          currentOrder.data.VdiCheckFull.PreviousKeeperCount === null ||
          currentOrder.data.VdiCheckFull.PreviousKeeperCount === 0
            ? "No Records"
            : `Number of Records: ${currentOrder.data.VdiCheckFull.PreviousKeeperCount}`,
        onClick: null,
        gradientColor:
          currentOrder.data.VdiCheckFull.PreviousKeeperCount < 2
            ? "#6f508c"
            : "#d55a6f",
        noHover: true,
      },
      {
        title: "V5C",
        details: `Date Issued: ${FormatDate(
          currentOrder.data.VdiCheckFull.LatestV5cIssuedDate
        )}`,
        onClick: null,
        gradientColor: currentOrder.data.VdiCheckFull.LatestV5cIssuedDate
          ? "#6f508c"
          : "#d55a6f",
        noHover: true,
      },
    ];
    setWindowData(windowData);
  };

  useEffect(() => {
    if (currentOrder) {
      setFree(currentOrder.vehicleFreeData);
      setBasic(currentOrder.data.VehicleAndMotHistory);
      setFull(currentOrder.data.VdiCheckFull);
      generateWindowData(currentOrder);
      setIsLoading(false);

      fetchImageUrl();
      if (currentOrder["aiContent"] === undefined) {
        fetchAIContent();
      } else if (currentOrder && currentOrder["aiContent"] !== undefined) {
        setAIContent(currentOrder["aiContent"]);
        setAIContentLoading(false);
      }
    }
  }, [currentOrder]);

  if (isLoading) {
    return <></>;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <div className="order-details">
        <div className={`new-order-transition ${showNewOrder ? "show" : ""}`}>
          <NewOrder />
        </div>
        {currentOrder && (
          <div>
            <VehicleMain
              free={free}
              basic={basic}
              orderId={currentOrder.orderId}
              auth={auth}
              handleDownloadReport={() =>
                handleDownloadReport(currentOrder.orderId, free, auth)
              }
              handleEmailReport={() =>
                handleEmailReport(
                  currentOrder.orderId,
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
              aiContent={aiContent?.["summary"]}
              aiContentLoading={aiContentLoading}
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
              aiContent={aiContent?.["main_details_analysis"]}
              aiContentLoading={aiContentLoading}
              imageUrl={imageUrl}
            />

            <EnergyConsumption
              basic={basic}
              aiContent={aiContent?.["energy_&_consumption_analysis"]}
              aiContentLoading={aiContentLoading}
            />

            <MOT
              free={free}
              basic={basic}
              aiContent={aiContent?.["mot_metrics_analysis"]}
              aiContentLoading={aiContentLoading}
              goToMOTSection={goToMOTSection}
            />

            <TAX
              free={free}
              basic={basic}
              full={full}
              aiContent={aiContent?.["tax_details_analysis"]}
              aiContentLoading={aiContentLoading}
              goToTAXSection={goToTAXSection}
            />

            <Mileage
              full={full}
              aiContent={aiContent?.["mileage_analysis"]}
              aiContentLoading={aiContentLoading}
              goToMileageSection={goToMileageSection}
            />

            <PlateChanges
              full={full}
              aiContent={aiContent?.["plate_changes"]}
              aiContentLoading={aiContentLoading}
              goToPlateSection={goToPlateSection}
            />

            <OutstandingFinances
              full={full}
              aiContent={aiContent?.["outstanding_finances"]}
              aiContentLoading={aiContentLoading}
              goToFinanceSection={goToFinanceSection}
            />

            <Stolen
              full={full}
              aiContent={aiContent?.["stolen"]}
              aiContentLoading={aiContentLoading}
              goToStolenSection={goToStolenSection}
            />

            <ImportExport
              full={full}
              aiContent={aiContent?.["import_/_export"]}
              aiContentLoading={aiContentLoading}
              goToImportExportSection={goToImportExportSection}
            />

            <WriteOff
              full={full}
              aiContent={aiContent?.["write_off"]}
              aiContentLoading={aiContentLoading}
              goToWriteOffSection={goToWriteOffSection}
            />

            <VICInspected
              full={full}
              aiContent={aiContent?.["vic_inspected"]}
              aiContentLoading={aiContentLoading}
            />

            <ImportantChecks
              basic={basic}
              aiContent={aiContent?.["important_checks"]}
              aiContentLoading={aiContentLoading}
            />

            {/* ABOUT THIS REPORT */}
            <section className="section">
              <div className="section-title">About This Report</div>
              <div className="section-divider"></div>
              <div className="section-content">
                <div>
                  Date of Registration: {FormatDate(currentOrder.dateTime)}
                </div>
                <br />
                <div>Report Reference: {currentOrder.orderId}</div>
              </div>
            </section>
          </div>
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
