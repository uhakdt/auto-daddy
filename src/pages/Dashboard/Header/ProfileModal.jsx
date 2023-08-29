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
