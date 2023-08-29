import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet";

import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";


import "./LandingPage.css";
import LandingFooter from "../NavMenus/LandingFooter";
import LandingBody from "./LandingBody";
import LandingHeader from "../NavMenus/LandingHeader";


function LandingPage() {
  



 

  return (
    <>
      <Helmet>
        <title>AutoDaddy | Home</title>
        <meta
          name="description"
          content="AutoDaddy: Get your complete Car History Check and ask ChatGPT any questions you have about it."
        />
        <meta
          name="keywords"
          content="auto, vehicle, car, services, autodaddy"
        />
        <link rel="canonical" href="https://autodaddy.co.uk/" />
      </Helmet>
      <div className="landing-container">
        <div className="landing-main">
          <LandingHeader/>
          <img
            src="/page-images/floating-nut.png"
            alt="nut"
            className="floating-nut"
          />
          <LandingBody />
          <img
            src="/page-images/floating-plus.png"
            alt="plus"
            className="floating-plus"
          />
          <LandingFooter />
        </div>
      </div>
    </>
  );
}

export default LandingPage;
