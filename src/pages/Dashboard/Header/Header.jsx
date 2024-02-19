import React, { useState } from "react";
import "./Header.css";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";

function Header() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="header">
      <img
        onClick={() => navigate("/")}
        src="/logos/logo.png"
        alt="logo"
        height={40}
        style={{ cursor: "pointer", padding: "1rem" }}
      />
      <div className="profile">
        <div className="profile-icon">
          <img
            onClick={() => setShowModal(true)}
            alt="report"
            src={process.env.PUBLIC_URL + "/icons/user.svg"}
            height={15}
            style={{ paddingRight: "0.3rem" }}
          />
        </div>
        <ProfileModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        ></ProfileModal>
      </div>
    </div>
  );
}

export default Header;
