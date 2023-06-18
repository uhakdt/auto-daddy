export const handleDownloadReport = async (orderId, free, auth) => {
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

export const handleEmailReport = async (
  orderId,
  free,
  auth,
  setEmailStatus,
  setSnackbarOpen
) => {
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
