import React from "react";

import { useNavigate } from "react-router-dom";
import { logout, auth } from "../../../firebase";

import Modal from "@mui/material/Modal";
import {
  MdOutlinePersonOutline,
  MdQuestionAnswer,
  MdExitToApp,
} from "react-icons/md";

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
            <img
              alt="report"
              src={process.env.PUBLIC_URL + "/icons/user.svg"}
              height={20}
              style={{ paddingRight: "0.5rem" }}
            />
            Profile ({email === null ? <>Anonymous</> : <>{email}</>})
          </div>
          <div
            className="sub-container"
            onClick={() => {
              onClose();
              navigate("/contact-us");
            }}
          >
            <img
              alt="contact"
              src={process.env.PUBLIC_URL + "/icons/contact.svg"}
              height={20}
              style={{ paddingRight: "0.5rem" }}
            />
            Contact Us
          </div>
          <div className="sub-container" onClick={handleLogout}>
            <img
              alt="logout"
              src={process.env.PUBLIC_URL + "/icons/logout.svg"}
              height={20}
              style={{ paddingRight: "0.5rem" }}
            />
            Logout
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ProfileModal;
