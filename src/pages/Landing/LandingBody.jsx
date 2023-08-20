import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
    Snackbar,
    SwipeableDrawer,
    Button,
    List,
    IconButton,
} from "@mui/material";

import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import confetti from 'canvas-confetti';

import { AppContext } from "../../appContext";
import { VehicleFreeData } from "../../models/VehicleFreeData";
import CarLoader from "../../SVGs/CarLoader";
import "./LandingBody.css";




function LandingBody() {
    const {
        setRegistrationNumber,
        vehicleFreeData,
        setVehicleFreeData,
        setPreviousPage,
    } = useContext(AppContext);
    const [user, loading] = useAuthState(auth);
    // const user = auth.currentUser;
    const [open, setOpen] = React.useState(false);
    const [pattern] = useState(/^[A-Za-z0-9]{1,7}$/);
    const [tempRegistrationNumber, setTempRegistrationNumber] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [responseStatus, setResponseStatus] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);


    const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        );

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    const navigate = useNavigate();

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitted(true);
        if (pattern.test(tempRegistrationNumber.replace(/\s/g, ""))) {
            setIsValid(true);
            setIsLoading(true);
            try {
                await axios.post(
                    `${process.env.REACT_APP_API_URL}/dvla/${tempRegistrationNumber.replace(/\s/g, "")}`
                )
                    .then((res) => {
                        const vehicleFreeData = new VehicleFreeData(res.data);
                        setVehicleFreeData(vehicleFreeData);
                        setRegistrationNumber(vehicleFreeData.registrationNumber);
                        setResponseStatus(true);
                        setIsLoading(false);

                        // Confetti code here because the license plate was valid and the data fetch was successful
                        confetti({
                            particleCount: 20,
                            spread: 50,
                            startVelocity: 20,
                        });
                    });
            } catch (error) {
                setSnackbarMessage(error.response.data.message);
                setSnackbarOpen(true);
                setResponseStatus(false);
                setIsLoading(false);
            }
        } else {
            setIsValid(false);
            setSnackbarMessage("Invalid UK license plate number");
            setSnackbarOpen(true);
        }
    };

    useEffect(() => {
        if (isValid && isSubmitted && responseStatus) {
            setPreviousPage("/packages");
            navigate("/packages", { state: { vehicleFreeData } });
        } else {
            setPreviousPage("/");
        }
    }, [isValid, isSubmitted, responseStatus, navigate, vehicleFreeData, user]);

    if (isLoading) {
        return (
            <div className="landing-loader">
                <CarLoader />
            </div>
        );
    }

    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setDrawerOpen(open);
    };

    return (
        <div className="landing-footer-container">
            <img src="/page-images/floating-plus.png" alt="plus" className="floating-plus" />
            <img src="/page-images/floating-nut.png" alt="nut" className="floating-nut" />
            {/* <img src="/page-images/floating-hand.png" alt="hand" className="floating-hand" /> */}

            <div className="landing-form-container">
                <h2 className="landing-title">
                    Full Car History & Ask <span className="gradient-text">ChatGPT</span> any questions about your car.
                </h2>
                {/* <p className="landing-description">
                    Guiding your car-buying journey with deep data dives, insights and
                    comprehensive reports!
                </p> */}
                <hr className="landing-divider" />  {/* This is the line you're adding */}

                <form className="landing-form" onSubmit={handleSubmit}>
                    <div className="landing-GB">
                        <span>GB</span>
                    </div>
                    <input
                        type="text"
                        className="landing-input"
                        placeholder="AB12 CDE"
                        value={tempRegistrationNumber}
                        onChange={(event) => setTempRegistrationNumber(event.target.value)}
                    />
                    <button type="submit" className="landing-button-go">
                        GO
                    </button>
                </form>
            </div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
            />
        </div>
    );
}

export default LandingBody;