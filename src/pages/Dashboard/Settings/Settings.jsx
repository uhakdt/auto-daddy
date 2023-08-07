import React from "react";

import { doc, deleteDoc } from "firebase/firestore";
import { db, logout, auth } from "../../../firebase";

import { Button } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import "./Settings.css";

const Settings = () => {
  const user = auth.currentUser;

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        const docRef = doc(db, "users", user.uid);
        await deleteDoc(docRef);

        await user.delete();

        logout();
      } catch (error) {
        console.error("Error deleting account: ", error);
        alert(
          "An error occurred while deleting your account. Please try again."
        );
      }
    }
  };

  return (
    <div className="page">
      <h1>Settings</h1>

      <div className="user-profile">
        <h3 className="email">Email: {user.email}</h3>
      </div>

      <Button
        variant="outlined"
        color="primary"
        startIcon={<EmailIcon />}
        onClick={() => {
          window.location.href = "mailto:support@autodaddy.com";
        }}
        className="contact-button"
      >
        Contact Us via Email
      </Button>

      <Button
        variant="outlined"
        color="primary"
        startIcon={<PhoneIcon />}
        onClick={() => {
          window.location.href = "tel:+1234567890";
        }}
        className="contact-button"
      >
        Contact Us via Phone
      </Button>
      <br />
      <br />
      <br />
      <Button
        variant="outlined"
        onClick={handleDeleteAccount}
        className="delete-account-button"
      >
        Delete Account
      </Button>
    </div>
  );
};

export default Settings;
