import React, { useState } from "react";
import "./Header.css";
import ProfileModal from "./ProfileModal";
import ReferralCodeModal from "./ReferralCodeModal";
import { useNavigate } from "react-router-dom";

function Header() {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showReferralCodeModal, setShowReferralCodeModal] = useState(false);
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
        <div
          className="profile-icon"
          style={{ display: "flex", alignItems: "center" }}
        >
          <img
            onClick={() => setShowProfileModal(true)}
            alt="profile"
            src={process.env.PUBLIC_URL + "/icons/user.svg"}
            height={15}
            style={{ paddingRight: "0.3rem", cursor: "pointer" }}
          />
          <ProfileModal
            isOpen={showProfileModal}
            onClose={() => setShowProfileModal(false)}
          />
          <button
            onClick={() => setShowReferralCodeModal(true)}
            className="refer-btn"
          >
            Refer
          </button>
          <ReferralCodeModal
            isOpen={showReferralCodeModal}
            onClose={() => setShowReferralCodeModal(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
