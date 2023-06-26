import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import AuthPage from "./pages/Authentication/AuthPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import PackagePage from "./pages/Package/PackagePage";
import PrivacyPage from "./pages/Policy/PrivacyPage";
import TermsPage from "./pages/Policy/TermsPage";
import CookiesPage from "./pages/Policy/CookiesPage";
import DataDeletionPage from "./pages/Policy/DataDeletionPage";
import GDPRPage from "./pages/Policy/GDPRPage";
import MoneyBackPage from "./pages/Policy/MoneyBackPage";
import ContactUsPage from "./pages/ContactUs/ContactUsPage";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/packages" element={<PackagePage />} />
      <Route path="/auth/*" element={<AuthPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/cookies" element={<CookiesPage />} />
      <Route path="/data-deletion" element={<DataDeletionPage />} />
      <Route path="/gdpr" element={<GDPRPage />} />
      <Route path="/money-back" element={<MoneyBackPage />} />
      <Route path="/contact-us" element={<ContactUsPage />} />
    </Routes>
  );
}

export default Routing;