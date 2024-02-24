import React from "react";

import { useNavigate } from "react-router-dom";
import { logout, auth } from "../../../firebase";

import Modal from "@mui/material/Modal";
import "./ProfileModal.css";

function ProfileModal({ isOpen, onClose }) {
  const user = auth.currentUser;

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onClose();
    navigate("/");
  };

  const email = user ? user.email : null;
  const uid = user ? user.uid : null;

  const sendReferralLinkToEmail = async () => {
    const apiUrl =
      process.env.REACT_APP_API_URL + "/referral/send_referral_link";
    const payload = {
      uid: uid,
      email: email,
    };

    await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      hideBackdrop={true}
      autoFocus={false}
    >
      <div className="full-screen" onClick={onClose}>
        <div className="container" onClick={(e) => e.stopPropagation()}>
          <div
            className="sub-container"
            onClick={() => {
              onClose();
              navigate("/dashboard");
            }}
          >
            Profile ({email === null ? <>Anonymous</> : <>{email}</>})
          </div>
          <div
            className="sub-container"
            onClick={() => {
              onClose();
              window.location.href =
                "mailto:main@autodaddy.co.uk?subject=Need Help&body=Hi, I need some assistance with...";
            }}
          >
            Need Help?
          </div>
          <div className="sub-container" onClick={handleLogout}>
            Logout
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ProfileModal;
