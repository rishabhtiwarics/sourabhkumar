import { useEffect, useState } from "react";
import Header from "../components/common/Header.jsx";
import Sidebar from "../components/common/Sidebar.jsx";
import Footer from "../components/common/Footer.jsx";
import HeroSection from "../components/home/HeroSection.jsx";
import ConsultationSection from "../components/home/ConsultationSection.jsx";
import RecoveryPathSection from "../components/home/RecoveryPathSection.jsx";
import SymptomReliefSection from "../components/home/SymptomReliefSection.jsx";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsSidebarOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSidebarOpen]);

  return (
    <>
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      <HeroSection />
      <ConsultationSection />
      <RecoveryPathSection />
      <SymptomReliefSection />


      <Footer />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}