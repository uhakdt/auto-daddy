import React, { useContext } from "react";

import { AppContext } from "../../../appContext";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../firebase";

import Modal from "@mui/material/Modal";
import {
  MdOutlinePersonOutline,
  MdQuestionAnswer,
  MdExitToApp,
} from "react-icons/md";

import "./ProfileModal.css";

function ProfileModal({ isOpen, onClose }) {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onClose();
    navigate("/dashboard");
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
            <MdOutlinePersonOutline size={20} />
            Profile
          </div>
          <div
            className="sub-container"
            onClick={() => {
              onClose();
              navigate("/contact-us");
            }}
          >
            <MdQuestionAnswer size={20} />
            Contact Us
          </div>
          <div className="sub-container" onClick={handleLogout}>
            <MdExitToApp size={20} />
            Logout
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ProfileModal;
