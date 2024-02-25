import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import PackagePage from "./pages/Package/PackagePage";
import PrivacyPage from "./pages/Policy/PrivacyPage";
import TermsPage from "./pages/Policy/TermsPage";
import CookiesPage from "./pages/Policy/CookiesPage";
import DataDeletionPage from "./pages/Policy/DataDeletionPage";
import GDPRPage from "./pages/Policy/GDPRPage";
import MoneyBackPage from "./pages/Policy/MoneyBackPage";
import ContactUsPage from "./pages/ContactUs/ContactUsPage";
import SignUpPage from "./pages/SignUp/SignUpPage";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/packages" element={<PackagePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/cookies" element={<CookiesPage />} />
      <Route path="/data-deletion" element={<DataDeletionPage />} />
      <Route path="/gdpr" element={<GDPRPage />} />
      <Route path="/money-back" element={<MoneyBackPage />} />
      <Route path="/contact-us" element={<ContactUsPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
    </Routes>
  );
}

export default Routing;
