import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";
import "./Header.css";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import { MdOutlinePersonOutline } from "react-icons/md";

function Header() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth);
    setShowModal(false);
  };

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
