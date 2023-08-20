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
import MainStatusBar from "./MainStatusBar/MainStatusBar";

import {
  handleDownloadReport,
  handleEmailReport,
} from "../../hooks/reportHooks";
import FormatDate from "../../auxiliaryFunctions/dateFunctions";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} variant="filled" ref={ref} {...props} />;
});

const OrderDetails = ({ currentOrder }) => {
  console.log("currentOrder", currentOrder?.ulez);
  const [free, setFree] = useState(null);
  const [basic, setBasic] = useState(null);
  const [full, setFull] = useState(null);
  const [aiContent, setAIContent] = useState(null);
  const [aiContentLoading, setAIContentLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);
  const [allStatusGood, setAllStatusGood] = useState(true);
  const [listOfConditions, setListOfConditions] = useState(null);
  const [statusBoxList, setStatusBoxList] = useState(null);
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

  const fetchAIContent = async (currentOrder) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/gpt/summary`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            extractedData: currentOrder["extractedData"],
          }),
        }
      );

      const aiContent = await response.json();

      const orderRef = doc(db, "orders", currentOrder.orderId);
      await setDoc(
        orderRef,
        { aiContent: aiContent, gptRequested: true },
        { merge: true }
      );

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

  const generateStatusBoxList = (currentOrder) => {
    const listOfConditions = {
      TAX: currentOrder.vehicleFreeData.TaxStatus === "Taxed",
      MOT: currentOrder.vehicleFreeData.MotStatus === "Valid",
      Finances:
        currentOrder.data.VdiCheckFull.FinanceRecordCount === null ||
        currentOrder.data.VdiCheckFull.FinanceRecordCount === 0,
      WriteOff:
        currentOrder.data.VdiCheckFull.WriteOffRecordCount === null ||
        currentOrder.data.VdiCheckFull.WriteOffRecordCount === 0,
      Export:
        currentOrder.data.VdiCheckFull.Imported === false &&
        currentOrder.data.VdiCheckFull.Exported === false,
      Scrapped: currentOrder.data.VdiCheckFull.Scrapped === false,
      Colour:
        currentOrder.data.VdiCheckFull.ColourChangeCount === null ||
        currentOrder.data.VdiCheckFull.ColourChangeCount === 0,
      Plate:
        currentOrder.data.VdiCheckFull.PlateChangeCount === null ||
        currentOrder.data.VdiCheckFull.PlateChangeCount === 0,
      Stolen:
        currentOrder.data.VdiCheckFull.Stolen === false ||
        currentOrder.data.VdiCheckFull.Stolen === null,
      Mileage:
        currentOrder.data.VdiCheckFull.MileageAnomalyDetected === false ||
        currentOrder.data.VdiCheckFull.MileageAnomalyDetected === null,
      Keepers:
        currentOrder.data.VdiCheckFull.PreviousKeeperCount === null ||
        currentOrder.data.VdiCheckFull.PreviousKeeperCount === 0,
      V5C: currentOrder.data.VdiCheckFull.LatestV5cIssuedDate,
    };
    setListOfConditions(listOfConditions);

    const generateStatusBox = (title, details, onClick, IsEmpty) => {
      const gradientColor = IsEmpty ? "#32ce57" : "#fd4438";
      const noHover = false;
      return { title, details, onClick, gradientColor, noHover, IsEmpty };
    };

    const statusBoxList = [
      generateStatusBox(
        "TAX",
        `Expires: ${FormatDate(currentOrder?.vehicleFreeData?.TaxDueDate)}`,
        () => scrollToRef(goToTAXSection),
        listOfConditions["TAX"]
      ),
      generateStatusBox(
        "MOT",
        `Expires: ${FormatDate(currentOrder?.vehicleFreeData?.MotExpiryDate)}`,
        () => scrollToRef(goToMOTSection),
        listOfConditions["MOT"]
      ),
      generateStatusBox(
        "Finances",
        `Number of Records: ${currentOrder?.data?.VdiCheckFull?.FinanceRecordCount}`,
        () => scrollToRef(goToFinanceSection),
        listOfConditions["Finances"]
      ),
      generateStatusBox(
        "Write Off",
        `Number of Records: ${currentOrder?.data?.VdiCheckFull?.WriteOffRecordCount}`,
        () => scrollToRef(goToWriteOffSection),
        listOfConditions["WriteOff"]
      ),
      generateStatusBox(
        "Export",
        "Click to View Details",
        () => scrollToRef(goToImportExportSection),
        listOfConditions["Export"]
      ),
      generateStatusBox(
        "Scrapped",
        `Scrap Date: ${FormatDate(
          currentOrder?.data?.VdiCheckFull?.ScrapDate
        )}`,
        null,
        listOfConditions["Scrapped"]
      ),
      generateStatusBox(
        "Colour",
        `Number of Records: ${currentOrder?.data?.VdiCheckFull?.ColourChangeCount}`,
        null,
        listOfConditions["Colour"]
      ),
      generateStatusBox(
        "Plate",
        `Number of Records: ${currentOrder?.data?.VdiCheckFull?.PlateChangeCount}`,
        () => scrollToRef(goToPlateSection),
        listOfConditions["Plate"]
      ),
      generateStatusBox(
        "Stolen",
        "Click to View Details",
        () => scrollToRef(goToStolenSection),
        listOfConditions["Stolen"]
      ),
      generateStatusBox(
        "Mileage",
        `Number of Records: ${currentOrder?.data?.VdiCheckFull?.MileageRecordCount}`,
        () => scrollToRef(goToMileageSection),
        listOfConditions["Mileage"]
      ),
      generateStatusBox(
        "Keepers",
        `Number of Records: ${currentOrder?.data?.VdiCheckFull?.PreviousKeeperCount}`,
        null,
        listOfConditions["Keepers"]
      ),
      generateStatusBox(
        "V5C",
        `Date Issued: ${FormatDate(
          currentOrder?.data?.VdiCheckFull?.LatestV5cIssuedDate
        )}`,
        null,
        listOfConditions["V5C"]
      ),
    ];

    if (
      currentOrder?.data.VehicleAndMotHistory?.VehicleRegistration?.FuelType.toLowerCase() ===
        "petrol" ||
      currentOrder?.data.VehicleAndMotHistory?.VehicleRegistration?.FuelType.toLowerCase() ===
        "diesel"
    ) {
      statusBoxList.push(
        generateStatusBox(
          "ULEZ",
          `Compliant: ${currentOrder?.ulez}`,
          null,
          currentOrder?.ulez
        )
      );
    }

    setStatusBoxList(statusBoxList);

    const isAllStatusGood = statusBoxList.every((box) => box.IsEmpty);
    setAllStatusGood(isAllStatusGood);
  };

  useEffect(() => {
    setFree(currentOrder.vehicleFreeData);
    setBasic(currentOrder.data.VehicleAndMotHistory);
    setFull(currentOrder.data.VdiCheckFull);
    generateStatusBoxList(currentOrder);
    fetchImageUrl();

    setIsLoading(false);
  }, [currentOrder]);

  useEffect(() => {
    // This effect will only run once when the component mounts
    if (currentOrder["gptRequested"] === true) {
      console.log(
        "AI Content already requested: \n",
        currentOrder["aiContent"]
      );
      setAIContent(currentOrder["aiContent"]);
      setAIContentLoading(false);
    } else if (currentOrder["gptRequested"] === false) {
      console.log("AI Content not requested");
      fetchAIContent(currentOrder);
    }
  }, [currentOrder]);

  if (isLoading) {
    return <></>;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <div className="order-details">
        {currentOrder && (
          <div>
            <VehicleMain
              free={free}
              basic={basic}
              imageUrl={imageUrl}
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

            <MainStatusBar allStatusGood={allStatusGood} />

            <section className="status-windows-container">
              {statusBoxList &&
                statusBoxList.map((statusBox, index) => (
                  <StatusWindow
                    key={index}
                    title={statusBox.title}
                    details={statusBox.details}
                    onClick={statusBox.onClick}
                    gradientColor={statusBox.gradientColor}
                    noHover={statusBox.noHover}
                    condition={statusBox.IsEmpty}
                  />
                ))}
            </section>

            <AIMainSummary
              aiContent={aiContent?.["summary"]}
              aiContentLoading={aiContentLoading}
            />

            <ImportantChecks
              basic={basic}
              aiContent={aiContent?.["important_checks"]}
              aiContentLoading={aiContentLoading}
              condition={listOfConditions["V5C"]}
            />

            <VehicleDetails
              free={free}
              basic={basic}
              aiContent={aiContent?.["main_details_analysis"]}
              aiContentLoading={aiContentLoading}
              imageUrl={imageUrl}
            />

            <MOT
              free={free}
              basic={basic}
              aiContent={aiContent?.["mot_metrics_analysis"]}
              aiContentLoading={aiContentLoading}
              goToMOTSection={goToMOTSection}
              condition={listOfConditions["MOT"]}
            />

            <TAX
              free={free}
              basic={basic}
              full={full}
              aiContent={aiContent?.["tax_details_analysis"]}
              aiContentLoading={aiContentLoading}
              goToTAXSection={goToTAXSection}
              condition={listOfConditions["TAX"]}
            />

            <Mileage
              full={full}
              aiContent={aiContent?.["mileage_analysis"]}
              aiContentLoading={aiContentLoading}
              goToMileageSection={goToMileageSection}
              condition={listOfConditions["Mileage"]}
            />

            <OutstandingFinances
              full={full}
              aiContent={aiContent?.["outstanding_finances"]}
              aiContentLoading={aiContentLoading}
              goToFinanceSection={goToFinanceSection}
              condition={listOfConditions["Finances"]}
            />

            <PlateChanges
              full={full}
              aiContent={aiContent?.["plate_changes"]}
              aiContentLoading={aiContentLoading}
              goToPlateSection={goToPlateSection}
              condition={listOfConditions["Plate"]}
            />

            <Stolen
              full={full}
              aiContent={aiContent?.["stolen"]}
              aiContentLoading={aiContentLoading}
              goToStolenSection={goToStolenSection}
              condition={listOfConditions["Stolen"]}
            />

            <ImportExport
              full={full}
              aiContent={aiContent?.["import_/_export"]}
              aiContentLoading={aiContentLoading}
              goToImportExportSection={goToImportExportSection}
              condition={listOfConditions["Export"]}
            />

            <WriteOff
              full={full}
              aiContent={aiContent?.["write_off"]}
              aiContentLoading={aiContentLoading}
              goToWriteOffSection={goToWriteOffSection}
              condition={listOfConditions["WriteOff"]}
            />

            <VICInspected
              full={full}
              aiContent={aiContent?.["vic_inspected"]}
              aiContentLoading={aiContentLoading}
            />

            <EnergyConsumption
              basic={basic}
              aiContent={aiContent?.["energy_&_consumption_analysis"]}
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
