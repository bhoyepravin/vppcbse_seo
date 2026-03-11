import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Component/Navbar/Navbar";
import Footer from "../Component/Footer/Footer";
import WhatsAppPopup from "../Component/ScrollToTop/WhatsAppPopup";
import ScrollToTop from "../Component/ScrollToTop/ScrollToTop";
import FloatingButtons from "../Component/FloatingButtons/FloatingButtons";
import { useSchoolSEO } from "../../hooks/useSEO";

function Layout() {
  const { pathname } = useLocation();
  useSchoolSEO(pathname);

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
