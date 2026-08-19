import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../common/Header.jsx";
import Footer from "../common/Footer.jsx";
import Sidebar from "../common/Sidebar.jsx";
import CustomCursor from "../common/CustomCursor.jsx";
import ScrollProgressIndicator from "../common/ScrollProgressIndicator.jsx";
import FloatingContactWidget from "../common/FloatingContactWidget.jsx";

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsSidebarOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSidebarOpen]);

  return (
    <>
      <CustomCursor />
      <ScrollProgressIndicator />
      <FloatingContactWidget />
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
