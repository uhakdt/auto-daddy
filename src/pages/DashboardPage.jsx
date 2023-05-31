import React from "react";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import "./DashboardPage.css";
import { useHandleLogout } from "../auxiliaryHooks/authHooks";
import Confetti from "react-dom-confetti";

function DashboardPage() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const handleLogout = useHandleLogout();
  const navigate = useNavigate();

  const config = {
    angle: 90,
    spread: 360,
    startVelocity: 20,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: "10px",
    height: "10px",
    perspective: "500px",
    colors: [
      "#FF0000",
      "#FF7F00",
      "#FFFF00",
      "#00FF00",
      "#0000FF",
      "#4B0082",
      "#8F00FF",
    ],
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    const fetchUserName = async () => {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setName(data.name);
      } catch (err) {
        console.error(err);
        alert("An error occured while fetching user data");
      }
    };

    fetchUserName();
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("redirect_status") === "succeeded") {
      setPaymentSuccess(true);
    }
  }, [user, loading, navigate]);

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        Logged in as
        <div>{name}</div>
        <div>{user?.email}</div>
        <button className="dashboard__btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="confetti-container">
        <Confetti active={paymentSuccess} config={config} />
      </div>
    </div>
  );
}

export default DashboardPage;
