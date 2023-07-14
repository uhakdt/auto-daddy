import React, { useState } from "react";
import "./Header.css";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import { MdOutlinePersonOutline } from "react-icons/md";

function Header() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="header">
      <h2 onClick={() => navigate("/")} className="logo">
        AutoDaddy
      </h2>
      <div className="profile">
        <div className="profile-icon">
          <MdOutlinePersonOutline
            size={20}
            onClick={() => setShowModal(true)}
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
