import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../common/Header.jsx";
import Footer from "../common/Footer.jsx";
import Sidebar from "../common/Sidebar.jsx";
import CustomCursor from "../common/CustomCursor.jsx";
import ScrollProgressIndicator from "../common/ScrollProgressIndicator.jsx";
import FloatingContactWidget from "../common/FloatingContactWidget.jsx";
import ConsultationModal from "../common/ConsultationModal.jsx";
import CareersModal from "../common/CareersModal.jsx";

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isCareersModalOpen, setIsCareersModalOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen || isBookModalOpen || isCareersModalOpen ? "hidden" : "";
    
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsSidebarOpen(false);
        setIsBookModalOpen(false);
        setIsCareersModalOpen(false);
      }
    };

    const handleGlobalClick = (e) => {
      const careersTrigger = e.target.closest('[data-open-modal="careers"], a[href="#careers"]');
      if (careersTrigger) {
        e.preventDefault();
        setIsCareersModalOpen(true);
        return;
      }

      const bookTrigger = e.target.closest('a[href*="#book"], .btn-book, .footer-cta-link, [data-open-modal="book"]');
      if (bookTrigger) {
        e.preventDefault();
        setIsBookModalOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleGlobalClick);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleGlobalClick);
    };
  }, [isSidebarOpen, isBookModalOpen, isCareersModalOpen]);

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
      <ConsultationModal isOpen={isBookModalOpen} onClose={() => setIsBookModalOpen(false)} />
      <CareersModal isOpen={isCareersModalOpen} onClose={() => setIsCareersModalOpen(false)} />
    </>
  );
}