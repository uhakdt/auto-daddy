export const handleDownloadReport = async (orderId, free, auth) => {
  try {
    const downloadUrl = await getReportUrl(orderId, free, auth);

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

export const handleDownloadSampleReport = async () => {
  try {
    const downloadUrl = await getSampleReportUrl(
      "f91d459d-0992-4ca5-be6e-adc013fae2b4",
      "AB12CDE",
      "SbsFM2GpAWeDSLs38nc8hCEWCce2"
    );

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

export const handleEmailReport = async (
  orderId,
  free,
  auth,
  setEmailStatus,
  setSnackbarOpen
) => {
  try {
    const vehicleRegMark = free.RegistrationNumber;
    const uid = auth.currentUser.uid;
    const email = auth.currentUser.email;

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/email/send-report`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId, vehicleRegMark, uid, email }),
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

export const getReportUrl = async (orderId, free, auth) => {
  try {
    const vehicleRegMark = free.RegistrationNumber;
    const uid = auth.currentUser.uid;
    const url = `${process.env.REACT_APP_API_URL}/firebase/download-report`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId, vehicleRegMark, uid }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { url: downloadUrl } = await response.json();
    return downloadUrl;
  } catch (err) {
    console.error("Error getting report URL:", err);
  }
};

export const getSampleReportUrl = async (orderId, registrationNumber, uid) => {
  try {
    const vehicleRegMark = registrationNumber;
    const url = `${process.env.REACT_APP_API_URL}/firebase/download-report`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId, vehicleRegMark, uid }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { url: downloadUrl } = await response.json();
    return downloadUrl;
  } catch (err) {
    console.error("Error getting report URL:", err);
  }
};
