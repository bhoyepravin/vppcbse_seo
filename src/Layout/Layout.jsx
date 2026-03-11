import React from "react";
import Navbar from "../Component/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Component/Footer/Footer";
import WhatsAppPopup from "../Component/ScrollToTop/WhatsAppPopup";
import ScrollToTop from "../Component/ScrollToTop/ScrollToTop";
import FloatingButtons from "../Component/FloatingButtons/FloatingButtons";

function Layout() {
  return (
    <div>
      <Navbar />
      <ScrollToTop />
      <FloatingButtons />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
